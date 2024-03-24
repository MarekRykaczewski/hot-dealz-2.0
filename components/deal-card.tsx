"use client";

import { useUser } from "@clerk/nextjs";
import { Deal } from "@prisma/client";
import { MessagesSquare, Scissors, Truck } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Vote from "./vote";

const DealCard = ({ deal }: { deal: Deal }) => {
  const {
    title,
    link,
    description,
    promoCode,
    score,
    startDate,
    endDate,
    price,
    nextBestPrice,
    shippingPrice,
  } = deal;

  const { user } = useUser();

  const userId = user?.id;

  const discountPercentage =
    price && nextBestPrice
      ? Math.floor((1 - price / nextBestPrice) * 100)
      : null;

  const handleCopyToClipboard = (promoCode: string) => {
    navigator.clipboard.writeText(promoCode).then(
      () => {
        toast.success("Promo code copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy promo code to clipboard.");
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <Vote userId={userId} dealId={deal.id} score={score} />
        <CardTitle>
          <Link href={`/deals/${deal.id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex gap-2 items-center w-full">
          <p className="text-orange-500 font-bold">{price} zł</p>
          <p className="text-gray-500 font-bold">{nextBestPrice} zł</p>
          {discountPercentage !== null && <p>-{discountPercentage}%</p>}
        </div>

        {promoCode && (
          <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
            <button
              onClick={() => handleCopyToClipboard(promoCode)}
              className="flex overflow-hidden text-ellipsis whitespace-nowrap border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
            >
              {promoCode}
              <Scissors size={16} />
            </button>
          </div>
        )}

        <div className="flex gap-2 text-gray-500">
          {shippingPrice ? (
            <p>Shipping Price: ${shippingPrice}</p>
          ) : (
            <p> Free Shipping </p>
          )}
          <Truck />
        </div>

        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <Button variant="orange">View Deal</Button>
        </Link>
        <Link href={`/deals/${deal.id}`}>
          <Button className="flex gap-2">
            <MessagesSquare size={18} />
            {deal.commentCount}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
