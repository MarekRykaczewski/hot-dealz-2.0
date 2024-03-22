import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, dealId, voteValue } = await req.json();
    // Create a new vote in the database
    const newVote = await db.vote.create({
      data: {
        userId,
        dealId,
        voteValue,
      },
      // Increment the score of the corresponding deal
      include: {
        deal: true,
      },
    });

    // Update the score of the deal based on the new vote
    const updatedDeal = await db.deal.update({
      where: {
        id: dealId,
      },
      data: {
        score: {
          increment: voteValue,
        },
      },
    });

    return NextResponse.json(newVote);
  } catch (error) {
    console.log("[VOTES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
