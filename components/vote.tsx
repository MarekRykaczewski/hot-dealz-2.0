"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface VoteProps {
  userId: string;
  dealId: string;
  score: number;
}

const Vote = ({ userId, dealId, score }: VoteProps) => {
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        if (!userId || !dealId) return;

        const response = await axios.get(`/api/votes/${userId}/${dealId}`);
        const vote = response.data;

        if (vote) {
          setUserVote(vote.voteValue > 0 ? "like" : "dislike");
        }
      } catch (error) {
        console.error("Error fetching user's vote:", error);
      }
    };

    fetchUserVote();
  }, [userId, dealId]);

  const handleVoteClick = async (voteType: "like" | "dislike") => {
    try {
      if (!userId || userVote) return;

      // Optimistically update UI
      setUserVote(voteType);

      const response = await axios.post("/api/votes", {
        userId,
        dealId,
        voteValue: voteType === "like" ? 1 : -1,
      });

      if (response.status !== 200) {
        throw new Error("Failed to submit vote");
      }

      setUserVote(voteType);
    } catch (error) {
      console.error("Error creating vote:", error);
      setUserVote(null);
    }
  };

  const scoreOffset = userVote === "like" ? 1 : userVote === "dislike" ? -1 : 0;
  const OptimisticScore = score + scoreOffset;

  return (
    <div className="relative flex justify-between items-center gap-2 rounded-l-full rounded-r-full border w-fit h-8 py-4">
      <button
        onClick={() => handleVoteClick("dislike")}
        disabled={userVote === "like" || userVote === "dislike"}
        className={cn(
          "text-blue-500 font-bold text-2xl hover:bg-blue-100 rounded-full h-8 w-8 items-center justify-center flex",
          userVote && "opacity-50 cursor-not-allowed"
        )}
      >
        <Minus />
      </button>
      <span
        className={`font-bold text-lg ${
          score >= 200
            ? "text-red-500"
            : score <= -200
            ? "text-blue-500"
            : "text-orange-500"
        } drop-shadow-md`}
      >
        {OptimisticScore}°
      </span>
      <button
        onClick={() => handleVoteClick("like")}
        disabled={userVote === "like" || userVote === "dislike"}
        className={cn(
          "text-red-500 font-bold text-2xl hover:bg-red-100 rounded-full h-8 w-8 items-center justify-center flex",
          userVote && "opacity-50 cursor-not-allowed"
        )}
      >
        <Plus />
      </button>
    </div>
  );
};

export default Vote;
