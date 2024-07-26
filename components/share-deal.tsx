"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleCopyToClipboard } from "@/lib/utils";
import { Facebook, Share2, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export function ShareDeal() {
  const pathname = usePathname();
  const currentUrl = `${window.location.origin}${pathname}`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <Share2 size={18} /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-2 text-2xl">Share this deal</DialogTitle>
          <Button
            onClick={(e) => handleCopyToClipboard(currentUrl)}
            variant="orange"
          >
            Copy Link
          </Button>
          <div className="flex gap-2 items-center">
            <div className="border-b border-gray-500 h-1 w-full" />
            OR
            <div className="border-b border-gray-500 h-1 w-full" />
          </div>
          <div className="flex gap-2 justify-around">
            <Button
              onClick={handleTwitterShare}
              variant="orange"
              className="w-full"
            >
              <Twitter />
            </Button>
            <Button
              onClick={handleFacebookShare}
              variant="orange"
              className="w-full"
            >
              <Facebook />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
