"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SortDeals = () => {
  const searchParams = useSearchParams();
  const sort_by = searchParams.get("sort_by");

  return (
    <>
      <Link href={{ pathname: "/", query: { sort_by: "score" } }} passHref>
        <button
          className={
            sort_by === "score"
              ? "text-orange-500"
              : "hover:text-orange-500 transition-all duration-200"
          }
        >
          Score
        </button>
      </Link>
      <Link href={{ pathname: "/", query: { sort_by: "comments" } }} passHref>
        <button
          className={
            sort_by === "comments"
              ? "text-orange-500"
              : "hover:text-orange-500 transition-all duration-200"
          }
        >
          Comments
        </button>
      </Link>
    </>
  );
};

export default SortDeals;
