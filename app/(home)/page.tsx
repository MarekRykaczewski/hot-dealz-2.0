import AlertBanner from "@/components/alert-banner";
import DealsList from "@/components/deals-list";
import SortDeals from "@/components/sort-deals";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import DealsPagination from "./_components/deals-pagination";
import FilterCategory from "./_components/filter-category";

export default async function Home({
  searchParams,
}: {
  searchParams?: ParsedUrlQuery;
}) {
  const page = parseInt(searchParams?.["page"] as string) || 1;
  const pageSize = parseInt(searchParams?.["per_page"] as string) || 10;
  const sortBy = (searchParams?.["sort_by"] as string) || "score";
  const categoryFilter = (searchParams?.["category"] as string) || "";

  const totalCount = await db.deal.count();

  const totalPages = Math.ceil(totalCount / pageSize);

  let orderBy: { [key: string]: "asc" | "desc" } = {};

  if (sortBy === "score") {
    orderBy = { score: "desc" };
  } else if (sortBy === "comments") {
    orderBy = { comments: { _count: "desc" } };
  }

  const dealsQuery = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      comments: {
        select: {
          id: true,
        },
      },
      user: true,
    },
    orderBy,
  };

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
      dealsQuery.where = {
        categoryId: {
          in: categoryIds,
        },
      };
    }
  }

  const dealsWithCommentCount = await db.deal.findMany(dealsQuery);

  const deals = await Promise.all(
    dealsWithCommentCount.map(async (deal) => {
      const commentCount = deal.comments.length;
      const { comments, ...dealWithoutComments } = deal;
      return { ...dealWithoutComments, commentCount };
    })
  );

  const categories = await db.category.findMany({
    where: { parentId: null },
  });

  const { userId } = auth();

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
      <DealsList deals={deals} />
      <div className="w-full mt-20">
        <DealsPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
