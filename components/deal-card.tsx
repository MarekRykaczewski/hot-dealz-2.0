"use client";

import { cn, handleCopyToClipboard } from "@/lib/utils";
import { DealWithComments } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Clock, MessagesSquare, Scissors, Truck } from "lucide-react";
import Link from "next/link";
import DealImageCarousel from "./deal-image-carousel";
import Preview from "./preview";
import SavedDealButton from "./saved-deal-button";
import { Button } from "./ui/button";
import UserProfileLink from "./user-profile-link";
import Vote from "./vote";

const DealCard = ({ deal }: { deal: DealWithComments }) => {
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
    userId: posterUserId,
    user: posterUser,
    isPublished,
  } = deal;

  const { user } = useUser();

  const userId = user?.id;

  const currentDate = new Date();
  const dealEnded = endDate && currentDate > endDate;
  const dealExpired = !deal.isPublished;

  const discountPercentage =
    price && nextBestPrice
      ? Math.floor((1 - price / nextBestPrice) * 100)
      : null;

  return (
    <div
      className={cn(
        "w-[95vw] xl:w-[60vw] shadow-md bg-white p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between",
        dealExpired || (dealEnded && "grayscale")
      )}
    >
      <div className="h-64 sm:w-64 bg-gray-100 border overflow-hidden rounded-xl">
        <DealImageCarousel imageUrls={deal.imageUrls} />
      </div>
      <div className="bg-white flex-grow sm:px-4 px-0 py-4 sm:py-0 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-600 flex justify-between">
            <Vote userId={userId!} dealId={deal.id} score={score} />
            <div className="flex gap-2 items-center">
              <Clock size={18} />
              <div className="flex flex-col items-center">
                <span>{deal.createdAt.toDateString()}</span>
              </div>
            </div>
          </div>

          <Link href={`/deals/${deal.id}`}>
            <div className="text-gray-900 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xl hover:text-orange-500 transition">
              {title}
            </div>
          </Link>

          <div className="flex gap-2 items-center w-full">
            <p className="text-orange-500 text-xl font-bold">{price}zł</p>
            <p className="text-gray-500 text-xl font-bold line-through">
              {nextBestPrice}zł
            </p>
            {discountPercentage !== null && (
              <p className="text-xl">-{discountPercentage}%</p>
            )}
            <Truck color="gray" size={24} />
            <div className="text-stone-500 text-sm">
              {shippingPrice ? (
                <p>{shippingPrice}zł</p>
              ) : (
                <p> Free Shipping </p>
              )}
            </div>
          </div>

          {promoCode && (
            <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
              <button
                value={promoCode}
                onClick={(e) => handleCopyToClipboard(e.currentTarget.value)}
                className="flex overflow-hidden text-ellipsis whitespace-nowrap border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
              >
                <Scissors size={16} />
                {promoCode}
              </button>
            </div>
          )}

          <Preview value={description} />
        </div>
        <div className="flex justify-between">
          <UserProfileLink username={posterUser.username} />
          <div className="flex gap-2">
            <SavedDealButton dealId={deal.id} />
            <Link href={`/deals/${deal.id}`}>
              <Button className="flex gap-2">
                <MessagesSquare size={18} />
                {deal.commentCount}
              </Button>
            </Link>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="orange">View Deal</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
