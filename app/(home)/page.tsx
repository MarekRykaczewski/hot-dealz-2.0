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

  const categories = await db.category.findMany();

  return (
    <main className="flex w-full flex-col items-center bg-gray-100">
      <div className="relative px-6 w-full flex items-center bg-stone-600 h-16">
        <FilterCategory categories={categories} />
      </div>
      <div className="flex font-semibold text-gray-500 w-full px-6 gap-4 py-3 items-center justify-start bg-white border-b ">
        <SortDeals />
      </div>
      <DealsList deals={deals} />
      <div className="w-full mt-2 p-2 border-t border-gray-200">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
