"use client";

import { useState } from "react";
import CommentCard from "./comment-card";
import CommentForm from "./comment-form";
import CommentSort from "./comment-sort";

interface CommentWithChildren extends Comment {
  childComments: CommentWithChildren[];
}

const CommentSection = ({ commentCount, dealId, dealComments }) => {
  const [sortCriteria, setSortCriteria] = useState<
    "newest" | "liked" | "oldest"
  >("newest");

  const handleSortChange = (value: "newest" | "liked" | "oldest") => {
    setSortCriteria(value);
  };

  const sortedComments = dealComments.slice().sort((a, b) => {
    if (sortCriteria === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortCriteria === "liked") {
      return b.likes - a.likes;
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

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

  const renderedComments = renderComments(sortedComments);

  return (
    <div>
      <div className="bg-white p-6 rounded-md">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-xl font-bold">{commentCount} Comments</h2>
          <span>
            Sorting: <CommentSort onChange={handleSortChange} />
          </span>
        </div>

        <CommentForm dealId={dealId} />
      </div>
      <div className="flex flex-col gap-2 mt-2">{renderedComments}</div>
    </div>
  );
};

export default CommentSection;
