import { db } from "@/lib/db";

export async function fetchCategories() {
  return await db.category.findMany({ where: { parentId: null } });
}
