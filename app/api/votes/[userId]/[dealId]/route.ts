import { db } from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { userId, dealId } = params;

    const vote = await db.vote.findFirst({
      where: {
        userId: userId,
        dealId: dealId,
      },
    });

    if (!vote) {
      return new NextResponse("Vote not found", { status: 404 });
    }

    return NextResponse.json(vote);
  } catch (error) {
    console.log("[VOTES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
