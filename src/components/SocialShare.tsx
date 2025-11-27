import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

const SocialShare = ({ title, description, url }: SocialShareProps) => {
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'email') {
      window.location.href = shareLinks[platform];
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2 pt-4 border-t border-border">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare('linkedin')}
        className="hover:text-primary"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare('twitter')}
        className="hover:text-primary"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare('facebook')}
        className="hover:text-primary"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare('email')}
        className="hover:text-primary"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopyLink}
        className="hover:text-primary"
        aria-label="Copy link"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SocialShare;
