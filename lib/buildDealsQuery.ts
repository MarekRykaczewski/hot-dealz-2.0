import { Prisma } from "@prisma/client";
import { db } from "./db";

export async function buildDealsQuery({
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
}): Promise<Prisma.DealFindManyArgs> {
  let orderBy: Prisma.DealOrderByWithRelationInput = {};

  if (sortBy === "score") {
    orderBy = { score: "desc" };
  } else if (sortBy === "comments") {
    orderBy = { comments: { _count: "desc" } };
  } else if (sortBy === "latest") {
    orderBy = { createdAt: "desc" };
  }

  const where: Prisma.DealWhereInput = {
    ...(searchTerm && {
      title: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }),
    ...(categoryFilter && {
      categoryId: {
        in: await getCategoryIds(categoryFilter),
      },
    }),
  };

  const dealsQuery: Prisma.DealFindManyArgs = {
    where,
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

  return dealsQuery;
}

async function getCategoryIds(categoryFilter: string) {
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

  return category
    ? [category.id, ...(category.subcategories.map((sub) => sub.id) || [])]
    : [];
}
