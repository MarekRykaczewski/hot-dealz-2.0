"use client";

import { Comment } from "@prisma/client";
import { Reply, ThumbsUp } from "lucide-react";
import { useState } from "react";
import ReplyForm from "./reply-form";
import { Button } from "./ui/button";
import UserProfileLink from "./user-profile-link";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [replying, setReplying] = useState(false);

  const toggleReply = () => {
    setReplying(!replying);
  };

  return (
    <div className="border bg-white p-2 rounded-lg" key={comment.id}>
      <div className="flex justify-between">
        <UserProfileLink username={comment.user.username} />
      </div>
      <div className="px-1 py-3">
        <p>{comment.content}</p>
      </div>
      <div className="flex gap-2">
        <Button className="flex gap-2" variant="ghost">
          <ThumbsUp size={18} /> Like
        </Button>
        <Button onClick={toggleReply} className="flex gap-2" variant="ghost">
          <Reply size={18} />
          Reply
        </Button>
      </div>
      {replying && <ReplyForm dealId={comment.dealId} parentId={comment.id} />}
    </div>
  );
};

export default CommentCard;
