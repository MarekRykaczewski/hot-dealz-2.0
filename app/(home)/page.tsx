import DealsList from "@/components/deals-list";
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

  const totalCount = await db.deal.count();

  const totalPages = Math.ceil(totalCount / pageSize);

  const deals = await db.deal.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <main className="flex flex-col items-center w-full">
      <FilterCategory />
      <DealsList deals={deals} />
      <div className="w-full mt-2 p-2 border-t border-gray-200">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
