import { PageProps } from "@/.next/types/app/(home)/page";
import AlertBanner from "@/components/alert-banner";
import DealsList from "@/components/deals-list";
import SortDeals from "@/components/sort-deals";
import { db } from "@/lib/db";
import { DealWithComments } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import DealsPagination from "../../_components/deals-pagination";
import FilterCategory from "../../_components/filter-category";

export default async function SavedDeals({ searchParams }: PageProps) {
  const { userId } = auth();
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

  const page = parseInt(searchParams?.["page"] as string) || 1;
  const pageSize = parseInt(searchParams?.["per_page"] as string) || 10;
  const sortBy = (searchParams?.["sort_by"] as string) || "score";
  const categoryFilter = (searchParams?.["category"] as string) || "";

  const savedDealsCount = await db.savedDeal.count({
    where: { userId },
  });

  const totalPages = Math.ceil(savedDealsCount / pageSize);

  let orderBy: { [key: string]: any } = {};

  if (sortBy === "score") {
    orderBy = { deal: { score: "desc" } };
  } else if (sortBy === "comments") {
    orderBy = { deal: { comments: { _count: "desc" } } };
  }

  // Fetch all saved deals for the user
  const savedDeals = await db.savedDeal.findMany({
    where: { userId },
    include: {
      deal: {
        include: {
          comments: true,
          user: true,
        },
      },
    },
    orderBy: orderBy,
  });

  // Apply pagination
  const paginatedSavedDeals = savedDeals.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  let dealsWithComments = paginatedSavedDeals.map((savedDeal) => ({
    ...savedDeal.deal,
    commentCount: savedDeal.deal.comments?.length,
  }));

  if (categoryFilter) {
    const category = await db.category.findFirst({
      where: {
        name: {
          equals: categoryFilter,
          mode: "insensitive",
        },
      },
      include: {
        subcategories: true,
      },
    });

    if (category) {
      const categoryIds = [
        category.id,
        ...(category.subcategories.map((sub) => sub.id) || []),
      ];

      dealsWithComments = dealsWithComments.filter((deal) =>
        categoryIds.includes(deal.categoryId!)
      );
    }
  }

  const categories = await db.category.findMany({
    where: { parentId: null },
  });

  const hasDatabaseUser = !!(
    userId && (await db.user.findUnique({ where: { clerkId: userId } }))
  );

  return (
    <main className="relative flex w-full flex-col items-center bg-gray-100">
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
      <DealsList deals={dealsWithComments as DealWithComments[]} />
      <div className="w-full mt-20">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
