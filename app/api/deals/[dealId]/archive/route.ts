import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dealId = params.dealId;
    const deal = await db.deal.findUnique({
      where: { id: dealId },
    });

    if (!deal) {
      return new NextResponse("Deal not found", { status: 404 });
    }

    if (deal.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedDeal = await db.deal.update({
      where: { id: dealId },
      data: { isPublished: !deal.isPublished },
    });

    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error("[ARCHIVE DEAL]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
