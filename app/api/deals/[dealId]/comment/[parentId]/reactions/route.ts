import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { parentId } = params;

    const commentReactions = await db.commentReaction.findMany({
      where: {
        commentId: parentId,
      },
    });

    return NextResponse.json(commentReactions);
  } catch (error) {
    console.error("[FETCH REACTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const { parentId } = params;
    const { userId } = auth();
    const { reaction } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!reaction) {
      return new NextResponse("Reaction is missing", { status: 400 });
    }

    const validReactions = ["like", "funny", "helpful"];
    if (!validReactions.includes(reaction)) {
      return new NextResponse("Invalid reaction", { status: 400 });
    }

    const existingReaction = await db.commentReaction.findFirst({
      where: {
        commentId: parentId,
        userId: userId,
      },
    });

    if (existingReaction) {
      // If the user has already reacted to the comment, update the existing reaction
      const updatedCommentReaction = await db.commentReaction.update({
        where: {
          id: existingReaction.id,
        },
        data: {
          reaction,
        },
      });

      return NextResponse.json(updatedCommentReaction);
    } else {
      // If the user has not reacted to the comment, create a new reaction
      const commentReaction = await db.commentReaction.create({
        data: {
          userId,
          commentId: parentId,
          reaction,
        },
      });

      return NextResponse.json(commentReaction);
    }
  } catch (error) {
    console.error("[RECORD REACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
