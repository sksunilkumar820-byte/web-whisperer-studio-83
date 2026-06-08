import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit configurations per form type
const RATE_LIMITS: Record<string, { maxRequests: number; windowMinutes: number }> = {
  contact: { maxRequests: 3, windowMinutes: 60 },
  newsletter: { maxRequests: 2, windowMinutes: 60 },
  job_alert: { maxRequests: 5, windowMinutes: 60 },
  job_application: { maxRequests: 10, windowMinutes: 60 },
  drop_cv: { maxRequests: 5, windowMinutes: 60 },
};

interface RateLimitRequest {
  formType: string;
  identifier: string; // email or other identifier
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  const first = xff.split(",")[0]?.trim();
  return first || req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, identifier }: RateLimitRequest = await req.json();

    // Validate input
    if (!formType || !identifier) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if form type is valid
    const config = RATE_LIMITS[formType];
    if (!config) {
      console.error("Invalid form type:", formType);
      return new Response(
        JSON.stringify({ error: "Invalid form type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for bypassing RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const windowStart = new Date(Date.now() - config.windowMinutes * 60 * 1000).toISOString();

    // Compose identifier with caller IP so an attacker cannot exhaust a
    // victim's quota by sending requests with the victim's email from
    // an unrelated network.
    const clientIp = getClientIp(req);
    const composedIdentifier = `${clientIp}|${identifier.toLowerCase()}|${formType}`;

    // Clean up old records periodically (1% chance per request)
    if (Math.random() < 0.01) {
      console.log("Running cleanup of old rate limit records");
      await supabase.rpc("cleanup_old_rate_limits");
    }

    // Check current rate limit status
    const { data: existingRecords, error: selectError } = await supabase
      .from("rate_limits")
      .select("id, submission_count")
      .eq("identifier", composedIdentifier)
      .eq("form_type", formType)
      .gte("window_start", windowStart)
      .order("window_start", { ascending: false })
      .limit(1);

    if (selectError) {
      console.error("Error checking rate limit:", selectError);
      return new Response(
        JSON.stringify({ error: "Failed to check rate limit" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let currentCount = 0;
    let recordId: string | null = null;

    if (existingRecords && existingRecords.length > 0) {
      currentCount = existingRecords[0].submission_count;
      recordId = existingRecords[0].id;
    }

    // Check if rate limited
    if (currentCount >= config.maxRequests) {
      console.log(`Rate limit exceeded on ${formType}`);
      const remainingMinutes = Math.ceil(config.windowMinutes - (Date.now() - new Date(windowStart).getTime()) / 60000);

      return new Response(
        JSON.stringify({
          allowed: false,
          message: `Too many submissions. Please try again in ${remainingMinutes} minutes.`,
          remainingMinutes,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update or create rate limit record
    if (recordId) {
      const { error: updateError } = await supabase
        .from("rate_limits")
        .update({ submission_count: currentCount + 1 })
        .eq("id", recordId);

      if (updateError) {
        console.error("Error updating rate limit:", updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from("rate_limits")
        .insert({
          identifier: composedIdentifier,
          form_type: formType,
          submission_count: 1,
          window_start: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Error inserting rate limit:", insertError);
      }
    }

    const remaining = config.maxRequests - currentCount - 1;
    console.log(`Rate limit check passed on ${formType}. Remaining: ${remaining}`);

    return new Response(
      JSON.stringify({
        allowed: true,
        remaining,
        message: "Request allowed",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in rate-limit function:", error);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
