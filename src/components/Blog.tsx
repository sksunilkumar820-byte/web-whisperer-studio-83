import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDistance } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  published_date: string | null;
  tags: string[] | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, content, featured_image_url, published_date, tags")
        .eq("published", true)
        .order("published_date", { ascending: false })
        .limit(3);

      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const estimateReadTime = (content: string) => {
    return Math.ceil(content.split(/\s+/).length / 200);
  };

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-elite">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-luxury">
            Stay informed with our latest thoughts on workforce management, consulting, and industry trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="card-elite p-0 overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            : posts.length === 0
            ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No blog posts published yet. Check back soon!</p>
              </div>
            )
            : posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="card-elite p-0 overflow-hidden group cursor-pointer flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary/30">
                          {post.title[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {estimateReadTime(post.content)} min
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth text-elite line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-luxury line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {post.published_date && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistance(new Date(post.published_date), new Date(), { addSuffix: true })}
                        </span>
                      )}
                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="text-center">
          <Button asChild className="btn-primary px-8 py-6 text-lg">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
