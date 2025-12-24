import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogCardSkeleton } from '@/components/LoadingSkeleton';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  published_date: string | null;
  tags: string[] | null;
  meta_description: string | null;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_date', { ascending: false });

      if (!error && data) {
        setPosts(data);
        setFilteredPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedTag, posts]);

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog | Industry Insights & Career Advice"
        description="Stay informed with the latest insights on executive recruitment, talent acquisition strategies, and career development tips from industry experts."
        keywords="recruitment blog, career advice, talent acquisition, HR insights, executive search tips"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Insights & Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert perspectives on talent acquisition, leadership, and workforce trends
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                variant={selectedTag === null ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/90"
                onClick={() => setSelectedTag(null)}
              >
                All Topics
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                {searchQuery || selectedTag
                  ? 'No articles found matching your criteria.'
                  : 'No blog posts published yet. Check back soon!'}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && !searchQuery && !selectedTag && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="block mb-12 group"
                >
                  <article className="grid md:grid-cols-2 gap-8 bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video md:aspect-auto">
                      {featuredPost.featured_image_url ? (
                        <img
                          src={featuredPost.featured_image_url}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/40">
                            {featuredPost.title[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4">Featured</Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {featuredPost.excerpt || featuredPost.meta_description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {featuredPost.published_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDistance(
                              new Date(featuredPost.published_date),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {estimateReadTime(featuredPost.content)} min read
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Post Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedTag ? filteredPosts : regularPosts).map(
                  (post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group"
                    >
                      <article className="h-full bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          {post.featured_image_url ? (
                            <img
                              src={post.featured_image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                              <span className="text-2xl font-bold text-primary/30">
                                {post.title[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                            {post.excerpt || post.meta_description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            {post.published_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDistance(
                                  new Date(post.published_date),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                              Read more <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
