import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const deals = await db.deal.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ deals });
  } catch (error) {
    console.error("[SEARCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
