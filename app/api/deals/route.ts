import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const {
      title,
      link,
      description,
      promoCode,
      price,
      nextBestPrice,
      shippingPrice,
      categoryId,
      startDate,
      endDate,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deal = await db.deal.create({
      data: {
        userId,
        title,
        link,
        description,
        promoCode,
        price,
        nextBestPrice,
        shippingPrice,
        categoryId,
        startDate,
        endDate,
        score: 0,
        isPublished: true,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.log("[DEALS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth();
    const {
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
      where: { id: params.dealId },
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
