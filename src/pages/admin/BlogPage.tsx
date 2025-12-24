import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { formatDistance } from 'date-fns';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published: boolean;
  published_date: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string;
}

const defaultPost: Partial<BlogPost> = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featured_image_url: '',
  published: false,
  tags: [],
  meta_title: '',
  meta_description: '',
};

const AdminBlogPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [tagInput, setTagInput] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    if (!editingPost || !user || !editingPost.title || !editingPost.content) return;

    const slug = editingPost.slug || generateSlug(editingPost.title);
    const postData = {
      title: editingPost.title,
      content: editingPost.content,
      slug,
      author_id: user.id,
      excerpt: editingPost.excerpt || null,
      featured_image_url: editingPost.featured_image_url || null,
      tags: editingPost.tags || null,
      meta_title: editingPost.meta_title || null,
      meta_description: editingPost.meta_description || null,
      published: editingPost.published || false,
      published_date: editingPost.published ? new Date().toISOString() : null,
    };

    let error;
    if (editingPost.id) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingPost.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert([postData]);
      error = insertError;
    }

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Post ${editingPost.id ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      setEditingPost(null);
      fetchPosts();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Post deleted successfully',
      });
      fetchPosts();
    }
    setDeleteId(null);
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        published: !post.published,
        published_date: !post.published ? new Date().toISOString() : null,
      })
      .eq('id', post.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      fetchPosts();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && editingPost) {
      const newTags = [...(editingPost.tags || []), tagInput.trim()];
      setEditingPost({ ...editingPost, tags: newTags });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (editingPost) {
      const newTags = (editingPost.tags || []).filter((tag) => tag !== tagToRemove);
      setEditingPost({ ...editingPost, tags: newTags });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Blog Posts</h2>
          <p className="text-muted-foreground">Create and manage your blog content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(defaultPost)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost?.id ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={editingPost?.title || ''}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        title: e.target.value,
                        slug: generateSlug(e.target.value),
                      })
                    }
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={editingPost?.slug || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, slug: e.target.value })
                    }
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={editingPost?.excerpt || ''}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  placeholder="Brief description of the post"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content * (HTML supported)</Label>
                <Textarea
                  id="content"
                  value={editingPost?.content || ''}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={editingPost?.featured_image_url || ''}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      featured_image_url: e.target.value,
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingPost?.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                  <Input
                    id="meta_title"
                    value={editingPost?.meta_title || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, meta_title: e.target.value })
                    }
                    placeholder="SEO optimized title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                  <Input
                    id="meta_description"
                    value={editingPost?.meta_description || ''}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        meta_description: e.target.value,
                      })
                    }
                    placeholder="SEO meta description"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={editingPost?.published || false}
                  onCheckedChange={(checked) =>
                    setEditingPost({ ...editingPost, published: checked })
                  }
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingPost(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingPost?.id ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No blog posts yet. Start creating content to drive organic traffic!
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {post.tags?.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {post.published && post.published_date
                        ? `Published ${formatDistance(new Date(post.published_date), new Date(), { addSuffix: true })}`
                        : `Created ${formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })}`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(post)}
                      title={post.published ? 'Unpublish' : 'Publish'}
                    >
                      {post.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPost(post);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlogPage;
