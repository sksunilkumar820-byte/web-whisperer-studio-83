import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  service_id: string;
  client_name: string;
  client_company: string;
  client_position: string;
  testimonial_text: string;
  rating: number | null;
  created_at: string;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('service_testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Testimonials</h2>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button>Add New Testimonial</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No testimonials yet</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{testimonial.client_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.client_position} at {testimonial.client_company}
                    </p>
                    <Badge variant="outline" className="mt-2">{testimonial.service_id}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {testimonial.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{testimonial.testimonial_text}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
