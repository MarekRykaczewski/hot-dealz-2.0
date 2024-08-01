"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SortDeals = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort_by = searchParams.get("sort_by");

  const getLinkProps = (sortByValue: string) => ({
    pathname: pathname,
    query: {
      ...Object.fromEntries(searchParams.entries()),
      sort_by: sortByValue,
    },
  });

  return (
    <>
      <Link href={getLinkProps("latest")} passHref>
        <button
          className={
            sort_by === "latest"
              ? "text-orange-500"
              : "hover:text-orange-500 transition-all duration-200"
          }
        >
          Latest
        </button>
      </Link>
      <Link href={getLinkProps("score")} passHref>
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
      <Link href={getLinkProps("comments")} passHref>
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
