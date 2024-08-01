import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function checkUser() {
  const { userId } = auth();
  const hasDatabaseUser = !!(
    userId && (await db.user.findUnique({ where: { clerkId: userId } }))
  );
  return { userId, hasDatabaseUser };
}
