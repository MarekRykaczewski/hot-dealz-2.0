import { Comment } from "@prisma/client";
import { Reply, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <div className="border p-2 rounded-lg" key={comment.id}>
      <div className="flex">
        <Image
          className="row-span-2"
          src={comment.profilePictureUrl}
          alt="Profile"
        />
        <div className="flex flex-col">
          <h1>Author</h1>
          <span className="text-gray-500"> 15 min</span>
        </div>
      </div>
      <div>
        <p>{comment.content}</p>
      </div>
      <div className="flex gap-2">
        <Button className="flex gap-2" variant="ghost">
          <ThumbsUp size={18} /> Like
        </Button>
        <Button className="flex gap-2" variant="ghost">
          <Reply size={18} />
          Reply
        </Button>
      </div>
    </div>
  );
};

export default Comment;
