"use client";

import React, { useState } from "react";

interface CommentSortProps {
  onChange: (value: "newest" | "liked" | "oldest") => void;
}

const CommentSort: React.FC<CommentSortProps> = ({ onChange }) => {
  const [sortValue, setSortValue] = useState<"newest" | "liked" | "oldest">(
    "newest"
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "newest" | "liked" | "oldest";
    setSortValue(value);
    onChange(value);
  };

  return (
    <div className="relative inline-block text-orange-500 font-semibold">
      <select
        value={sortValue}
        onChange={handleSortChange}
        className="appearance-none bg-transparent border-none py-2 pr-8 rounded"
        aria-label="Sort comments"
      >
        <option value="newest">Newest First</option>
        <option value="liked">Most Liked</option>
        <option value="oldest">Oldest First</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 0 1 1.414 1.414L10 10.414l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </div>
    </div>
  );
};

export default CommentSort;
