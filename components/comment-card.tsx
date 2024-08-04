"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { timeAgo } from "@/lib/utils";
import { CommentBase } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Check, Laugh, Reply, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReplyForm from "./reply-form";
import { Button } from "./ui/button";
import UserProfileLink from "./user-profile-link";

interface Reaction {
  reaction: string;
}

const CommentCard = ({ comment }: { comment: CommentBase }) => {
  const [replying, setReplying] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [childComments, setChildComments] = useState<CommentBase[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const {
    ref: reactionRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const { userId } = useAuth();

  const reactionCounts = reactions.reduce<Record<string, number>>(
    (acc, reaction) => {
      acc[reaction.reaction] = (acc[reaction.reaction] || 0) + 1;
      return acc;
    },
    {}
  );

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
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error("Error recording reaction:", errorMessage);
    }
  };

  const getReactionEmoji = (reaction: string) => {
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
          const data: Reaction[] = response.data;
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

  const loadReplies = async () => {
    setLoadingReplies(true);
    try {
      const response = await axios.get(
        `/api/deals/${comment.dealId}/comment/${comment.id}`
      );
      if (response.status === 200) {
        const data: CommentBase[] = response.data;
        setChildComments(data);
        setRepliesLoaded(true);
      } else {
        throw new Error("Failed to load replies");
      }
    } catch (error) {
      console.error("Error loading replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  return (
    <div className="border bg-white p-4 rounded-lg" key={comment.id}>
      <div className="flex justify-between">
        <UserProfileLink username={comment.user.username} />
        <span className="text-gray-500 text-sm">
          {timeAgo(comment.createdAt)}
        </span>
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
      {!repliesLoaded && (
        <Button
          onClick={loadReplies}
          variant="outline"
          disabled={loadingReplies}
        >
          {loadingReplies ? "Loading..." : "Load Replies"}
        </Button>
      )}
      <div className="mt-2">
        {childComments.map((childComment) => (
          <CommentCard key={childComment.id} comment={childComment} />
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
