import { PageProps } from "@/.next/types/app/layout";
import AlertBanner from "@/components/alert-banner";
import DealsList from "@/components/deals-list";
import SortDeals from "@/components/sort-deals";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { fetchCategories } from "@/lib/fetchCategories";
import { fetchSavedDeals } from "@/lib/fetchSavedDeals";
import { DealWithComments } from "@/types";
import Link from "next/link";
import DealsPagination from "../../_components/deals-pagination";
import FilterCategory from "../../_components/filter-category";

export default async function SavedDeals({ searchParams }: PageProps) {
  const page = parseInt(searchParams?.["page"] as string) || 1;
  const pageSize = parseInt(searchParams?.["per_page"] as string) || 10;
  const sortBy = (searchParams?.["sort_by"] as string) || "score";
  const categoryFilter = (searchParams?.["category"] as string) || "";

  const { userId, hasDatabaseUser } = await checkUser();

  const deals = await fetchSavedDeals({
    userId: userId!,
    sortBy,
    categoryFilter,
  });
  const categories = await fetchCategories();

  const totalCount = await db.deal.count();
  const totalPages = Math.min(Math.ceil(totalCount / pageSize), 10);

  if (!userId) {
    return (
      <main className="relative flex w-full flex-col items-center bg-gray-100">
        <div className="mt-2">
          <AlertBanner
            title={"Not Logged In"}
            message={"Please log in to view your saved deals"}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex w-full flex-col items-center h-screen bg-gray-100">
      <div className="relative px-6 w-full flex justify-center items-center bg-stone-600 h-16">
        <div className="lg:w-[60vw] w-full">
          <FilterCategory categories={categories} />
        </div>
      </div>
      <div className="flex font-semibold justify-center text-gray-500 w-full py-3 items-center bg-white border-b ">
        <div className="flex gap-4 lg:w-[60vw] px-6 w-full">
          <SortDeals />
        </div>
      </div>
      <div className="mt-2">
        {userId && !hasDatabaseUser ? (
          <Link href={"/finish-account-setup"}>
            <AlertBanner
              title={"Heads up!"}
              message={
                "In order to post and interact you should setup a username"
              }
            />
          </Link>
        ) : null}
      </div>
      {deals.length > 0 ? (
        <DealsList deals={deals as DealWithComments[]} />
      ) : (
        <p>User has no saved deals</p>
      )}
      <div className="w-full mt-20">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
