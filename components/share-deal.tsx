"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Facebook, Share2, Twitter } from "lucide-react";

export function ShareDeal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <Share2 size={18} /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this deal</DialogTitle>
          <Button> Copy Link </Button>
          <div className="flex gap-2 items-center">
            <div className="border-b border-gray-500 h-1 w-full" />
            OR
            <div className="border-b border-gray-500 h-1 w-full" />
          </div>
          <div className="flex justify-around">
            <Button>
              <Twitter />
            </Button>
            <Button>
              <Facebook />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
