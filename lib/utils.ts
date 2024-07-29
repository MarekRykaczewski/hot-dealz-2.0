import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success("Promo code copied to clipboard!");
    },
    () => {
      toast.error("Failed to copy promo code to clipboard.");
    }
  );
};

export async function buildDealsQuery({
  page,
  pageSize,
  sortBy,
  categoryFilter,
}: {
  page: number;
  pageSize: number;
  sortBy: string;
  categoryFilter: string;
}): Promise<Prisma.DealFindManyArgs> {
  let orderBy: { [key: string]: any } = {};

  if (sortBy === "score") {
    orderBy = { score: "desc" };
  } else if (sortBy === "comments") {
    orderBy = { comments: { _count: "desc" } };
  }

  const dealsQuery: Prisma.DealFindManyArgs = {
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

  return dealsQuery;
}
