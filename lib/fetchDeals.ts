import { db } from "@/lib/db";
import { DealWithComments } from "@/types";
import { Prisma } from "@prisma/client";
import { buildDealsQuery } from "./buildDealsQuery";

export async function fetchDeals({
  page,
  pageSize,
  sortBy,
  categoryFilter,
  searchTerm = "",
}: {
  page: number;
  pageSize: number;
  sortBy: string;
  categoryFilter: string;
  searchTerm?: string;
}): Promise<DealWithComments[]> {
  let orderBy: Prisma.DealOrderByWithRelationInput = {};

  if (sortBy === "score") {
    orderBy = { score: "desc" };
  } else if (sortBy === "comments") {
    orderBy = { comments: { _count: "desc" } };
  } else if (sortBy === "latest") {
    orderBy = { createdAt: "desc" };
  }

  const dealsQuery = await buildDealsQuery({
    page,
    pageSize,
    sortBy,
    categoryFilter,
    searchTerm,
  });

  const dealsWithComments = await db.deal.findMany({
    ...dealsQuery,
    include: {
      comments: true,
      user: true,
    },
  });

  return dealsWithComments.map((deal) => ({
    ...deal,
    commentCount: deal.comments?.length,
    user: {
      ...deal.user,
      username: deal.user.username || "Unknown",
    },
  }));
}
