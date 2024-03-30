"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const CommentSort = () => {
  return (
    <Select>
      <SelectTrigger className="text-xl text-orange-500 font-semibold">
        <SelectValue placeholder="Newest" />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-sm">
        <SelectItem
          className="text-center w-full border-b py-2 px-8 hover:text-orange-500 transition-all duration-200"
          value="newest"
        >
          Newest First
        </SelectItem>
        <SelectItem
          className="text-center w-full border-b py-2 px-8 hover:text-orange-500 transition-all duration-200"
          value="liked"
        >
          Most Liked
        </SelectItem>
        <SelectItem
          className="text-center w-full border-b py-2 px-8 hover:text-orange-500 transition-all duration-200"
          value="oldest"
        >
          Oldest First
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CommentSort;
