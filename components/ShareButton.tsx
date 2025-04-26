"use client";
import { useCallback } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ title, url }: { title: string; url: string }) {
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: `Check out this review for ${title}`,
          url,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard.");
    }
  }, [title, url]);

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-1 h-8 text-xs"
    >
      <Share2 className="h-3 w-3" />
      Share
    </Button>
  );
}
