import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const { dealId } = params;
    const { userId } = auth();
    const { content } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content) {
      return new NextResponse("Content is missing", { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        dealId,
        userId,
        content,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[DEALS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
