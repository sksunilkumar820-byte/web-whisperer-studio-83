import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Workforce Management in 2024",
    excerpt: "Explore emerging trends in workforce management and how technology is reshaping the consulting landscape.",
    date: "November 10, 2024",
    category: "Workforce",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Strategic Hiring: Building High-Performance Teams",
    excerpt: "Learn proven strategies for identifying, attracting, and retaining top talent in competitive markets.",
    date: "November 5, 2024",
    category: "Hiring",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Digital Transformation in HR: A Complete Guide",
    excerpt: "Discover how digital transformation is revolutionizing HR processes and improving employee experiences.",
    date: "October 28, 2024",
    category: "Technology",
    readTime: "6 min read",
  },
];

const Blog = () => {
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
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="card-elite p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth text-elite">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-luxury">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {post.date}
                </span>
                <Button variant="ghost" className="text-primary hover:text-primary-dark p-0">
                  Read More →
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button className="btn-primary px-8 py-6 text-lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
