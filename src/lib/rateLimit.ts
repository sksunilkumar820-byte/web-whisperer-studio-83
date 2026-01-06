import { supabase } from "@/integrations/supabase/client";

export type FormType = "contact" | "newsletter" | "job_alert" | "job_application";

interface RateLimitResponse {
  allowed: boolean;
  remaining?: number;
  message: string;
  remainingMinutes?: number;
}

export async function checkRateLimit(
  formType: FormType,
  identifier: string
): Promise<RateLimitResponse> {
  try {
    const { data, error } = await supabase.functions.invoke("rate-limit", {
      body: { formType, identifier },
    });

    if (error) {
      console.error("Rate limit check failed:", error);
      // On error, allow the submission to proceed (fail open)
      return { allowed: true, message: "Rate limit check skipped" };
    }

    return data as RateLimitResponse;
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - allow submission if rate limiting fails
    return { allowed: true, message: "Rate limit check skipped" };
  }
}
