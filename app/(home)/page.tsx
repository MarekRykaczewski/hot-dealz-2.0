import DealsList from "@/components/deals-list";
import SortDeals from "@/components/sort-deals";
import { db } from "@/lib/db";
import { ParsedUrlQuery } from "querystring";
import DealsPagination from "./_components/deals-pagination";
import FilterCategory from "./_components/filter-category";

export default async function Home({
  searchParams,
}: {
  searchParams?: ParsedUrlQuery;
}) {
  const page = parseInt(searchParams?.["page"] as string) || 1;
  const pageSize = parseInt(searchParams?.["per_page"] as string) || 3;
  const sortBy = (searchParams?.["sort_by"] as string) || "score";

  const totalCount = await db.deal.count();

  const totalPages = Math.ceil(totalCount / pageSize);

  let orderBy: { [key: string]: "asc" | "desc" } = {};

  if (sortBy === "score") {
    orderBy = { score: "desc" };
  } else if (sortBy === "comments") {
    orderBy = { comments: { _count: "desc" } };
  }

  const dealsWithCommentCount = await db.deal.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      comments: {
        select: {
          id: true,
        },
      },
    },
    orderBy,
  });

  const deals = await Promise.all(
    dealsWithCommentCount.map(async (deal) => {
      const commentCount = deal.comments.length;
      const { comments, ...dealWithoutComments } = deal;
      return { ...dealWithoutComments, commentCount };
    })
  );

  return (
    <main className="flex flex-col items-center bg-gray-100 w-full">
      <div className="w-full">
        <FilterCategory />
        <SortDeals />
      </div>
      <DealsList deals={deals} />
      <div className="w-full mt-2 p-2 border-t border-gray-200">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
