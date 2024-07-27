import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const {
      id,
      title,
      link,
      description,
      promoCode,
      price,
      imageUrls,
      nextBestPrice,
      shippingPrice,
      categoryId,
      startDate,
      endDate,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deal = await db.deal.update({
      where: { id },
      data: {
        userId,
        title,
        link,
        imageUrls,
        description,
        promoCode,
        price,
        nextBestPrice,
        shippingPrice,
        categoryId,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.log("[UPDATE DEAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
