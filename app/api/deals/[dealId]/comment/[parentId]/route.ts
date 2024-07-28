import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { dealId: string; parentId: string } }
) {
  const { dealId, parentId } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  if (!dealId || !parentId) {
    return NextResponse.json(
      { message: "Deal ID and Parent ID are required" },
      { status: 400 }
    );
  }

  try {
    const comments = await db.comment.findMany({
      where: {
        dealId,
        parentId,
      },
      include: {
        user: true,
        childComments: {
          take: Number(limit),
          skip: (Number(page) - 1) * Number(limit),
          include: {
            user: true,
          },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    let errorMessage = "Failed to fetch comments";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        message: errorMessage,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
