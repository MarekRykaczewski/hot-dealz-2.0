import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth();
    const { dealId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingSavedDeal = await db.savedDeal.findUnique({
      where: {
        userId_dealId: {
          userId,
          dealId,
        },
      },
    });

    if (existingSavedDeal) {
      return new NextResponse("Deal already saved", { status: 400 });
    }

    await db.savedDeal.create({
      data: {
        userId,
        dealId,
      },
    });

    return new NextResponse("Deal saved successfully");
  } catch (error) {
    console.error("[SAVE DEAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth();
    const { dealId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the deal is saved
    const existingSavedDeal = await db.savedDeal.findUnique({
      where: {
        userId_dealId: {
          userId,
          dealId,
        },
      },
    });

    if (!existingSavedDeal) {
      return new NextResponse("Deal is not saved", { status: 400 });
    }

    await db.savedDeal.delete({
      where: {
        userId_dealId: {
          userId,
          dealId,
        },
      },
    });

    return new NextResponse("Deal unsaved successfully");
  } catch (error) {
    console.error("[UNSAVE_DEAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
