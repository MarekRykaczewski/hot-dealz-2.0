import { db } from "@/lib/db";
import { DealWithComments } from "@/types";
import { Prisma } from "@prisma/client";

export async function fetchSavedDeals({
  userId,
  sortBy,
  categoryFilter,
  searchTerm = "",
}: {
  userId: string;
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

  const savedDeals = await db.savedDeal.findMany({
    where: { userId },
    include: {
      deal: {
        include: {
          comments: true,
          user: true,
          category: true,
        },
      },
    },
    orderBy: {
      deal: orderBy,
    },
  });

  let dealsWithComments = savedDeals.map((savedDeal) => ({
    ...savedDeal.deal,
    commentCount: savedDeal.deal.comments?.length || 0,
    user: {
      ...savedDeal.deal.user,
      username: savedDeal.deal.user.username || "Unknown",
    },
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

  if (searchTerm) {
    dealsWithComments = dealsWithComments.filter((deal) =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return dealsWithComments;
}
