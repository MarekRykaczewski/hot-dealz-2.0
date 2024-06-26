"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { useAuth } from "@clerk/nextjs";
import { Comment } from "@prisma/client";
import axios from "axios";
import { Check, Laugh, Reply, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReplyForm from "./reply-form";
import { Button } from "./ui/button";
import UserProfileLink from "./user-profile-link";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [replying, setReplying] = useState(false);
  const [reactions, setReactions] = useState([]);
  const {
    ref: reactionRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const userId = useAuth();

  const reactionCounts = reactions.reduce((acc, reaction) => {
    acc[reaction.reaction] = (acc[reaction.reaction] || 0) + 1;
    return acc;
  }, {});

  const toggleReply = () => {
    setReplying(!replying);
  };

  const handleReaction = async (reaction: string) => {
    try {
      const response = await axios.post(
        `/api/deals/${comment.dealId}/comment/${comment.id}/reactions`,
        {
          userId: userId,
          commentId: comment.id,
          reaction: reaction,
        }
      );

      if (response.status === 200) {
        toast.success("Reacted to comment!");
        console.log("Reaction recorded successfully");
      } else {
        throw new Error("Failed to record reaction");
      }
    } catch (error) {
      console.error("Error recording reaction:", error.message);
    }
  };

  const getReactionEmoji = (reaction) => {
    switch (reaction) {
      case "like":
        return "👍";
      case "funny":
        return "😄";
      case "helpful":
        return "🙌";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          `/api/deals/${comment.dealId}/comment/${comment.id}/reactions`
        );
        if (response.status === 200) {
          const data = response.data;
          setReactions(data);
        } else {
          throw new Error("Failed to fetch reactions");
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [comment.dealId, comment.id]);

  return (
    <div className="border bg-white p-2 rounded-lg" key={comment.id}>
      <div className="flex justify-between">
        <UserProfileLink username={comment.user.username} />
      </div>
      <div className="px-1 py-3">
        <p>{comment.content}</p>
      </div>
      <div className="relative items-center flex gap-2">
        <Button
          onClick={() => setIsComponentVisible(true)}
          className="flex gap-2"
          variant="ghost"
        >
          <ThumbsUp size={18} /> Like
          {isComponentVisible && (
            <div
              ref={reactionRef}
              className="absolute top-0 left-0 flex gap-6 bg-white border p-4 shadow-md"
            >
              <div
                className="flex flex-col items-center gap-1 font-bold hover:text-sky-600"
                onClick={() => handleReaction("like")}
              >
                <ThumbsUp size={50} /> Like
              </div>
              <div
                className="flex flex-col items-center gap-1 font-bold hover:text-yellow-400"
                onClick={() => handleReaction("funny")}
              >
                <Laugh size={50} /> Funny
              </div>
              <div
                className="flex flex-col items-center gap-1 font-bold hover:text-emerald-600"
                onClick={() => handleReaction("helpful")}
              >
                <Check size={50} />
                Helpful
              </div>
            </div>
          )}
        </Button>
        <Button onClick={toggleReply} className="flex gap-2" variant="ghost">
          <Reply size={18} />
          Reply
        </Button>
        {reactions && (
          <div className="flex gap-2 ml-auto text-xl">
            {Object.entries(reactionCounts).map(([reaction, count]) => (
              <span key={reaction}>
                {getReactionEmoji(reaction)}
                {count}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2">
        {replying && (
          <ReplyForm dealId={comment.dealId} parentId={comment.id} />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
