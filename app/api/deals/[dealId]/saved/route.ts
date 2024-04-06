import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth();
    const { dealId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const savedDeal = await db.savedDeal.findUnique({
      where: {
        userId_dealId: {
          userId,
          dealId,
        },
      },
    });

    const isSaved = !!savedDeal;

    return NextResponse.json({ isSaved });
  } catch (error) {
    console.error("[CHECK_DEAL_SAVED]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
