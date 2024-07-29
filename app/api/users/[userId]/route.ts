import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { username } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return new NextResponse("Username already taken", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const newUser = await db.user.create({
      data: { clerkId: userId, username },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("[CREATE USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const { username } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingUsername = await db.user.findFirst({
      where: {
        username,
        NOT: { clerkId: userId },
      },
    });

    if (existingUsername) {
      return new NextResponse("Username already taken", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: { username },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[UPDATE USER USERNAME]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
