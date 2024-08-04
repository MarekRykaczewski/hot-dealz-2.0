"use client";

import { CommentWithChildren, CommentWithLikes } from "@/types";
import { Comment } from "@prisma/client";
import { useState } from "react";
import CommentCard from "./comment-card";
import CommentForm from "./comment-form";
import CommentSort from "./comment-sort";

interface CommentSectionProps {
  commentCount: number;
  dealId: string;
  dealComments: Comment[];
}

const CommentSection = ({
  commentCount,
  dealId,
  dealComments,
}: CommentSectionProps) => {
  const [sortCriteria, setSortCriteria] = useState<
    "newest" | "liked" | "oldest"
  >("newest");

  const handleSortChange = (value: string) => {
    if (value === "newest" || value === "liked" || value === "oldest") {
      setSortCriteria(value as "newest" | "liked" | "oldest");
    }
  };

  const sortedComments = (dealComments as CommentWithLikes[])
    .slice()
    .sort((a, b) => {
      if (sortCriteria === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortCriteria === "liked") {
        return b.reactions.length - a.reactions.length;
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

  const commentsWithChildren = sortedComments.map((comment) => ({
    ...comment,
    childComments: comment.childComments || [],
    user: comment.user,
  }));

  const renderComments = (
    comments: CommentWithChildren[],
    nestingLevel = 0
  ) => {
    return comments.map((comment: CommentWithChildren) => (
      <div key={comment.id} style={{ marginLeft: nestingLevel * 10 }}>
        <CommentCard comment={comment} />
        {comment.childComments &&
          comment.childComments.length > 0 &&
          renderComments(comment.childComments, nestingLevel + 1)}
      </div>
    ));
  };

  const renderedComments = renderComments(commentsWithChildren);

  return (
    <div>
      <div className="bg-white p-6 rounded-md">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-xl font-bold">{commentCount} Comments</h2>
          <span>
            Sorting:{" "}
            <CommentSort
              onChange={handleSortChange as (value: string) => void}
            />
          </span>
        </div>

        <CommentForm dealId={dealId} />
      </div>
      <div className="flex flex-col gap-2 mt-2">{renderedComments}</div>
    </div>
  );
};

export default CommentSection;
