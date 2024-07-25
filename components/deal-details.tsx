"use client";

import { Deal } from "@prisma/client";
import { Scissors, Truck } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import DealImageCarousel from "./deal-image-carousel";
import { ShareDeal } from "./share-deal";
import { Button } from "./ui/button";
import Vote from "./vote";

const DealDetails = ({ deal }: { deal: Deal }) => {
  const discountPercentage =
    deal.price && deal.nextBestPrice
      ? Math.floor((1 - deal.price / deal.nextBestPrice) * 100)
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
    <>
      <div className="max-h-96 sm:w-2/5 mr-3 bg-gray-100 border overflow-hidden rounded-xl">
        <DealImageCarousel imageUrls={deal.imageUrls} />
      </div>
      <div className="bg-white flex-grow px-0 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-600 flex justify-between">
            <Vote userId={deal.userId} dealId={deal.id} score={deal.score} />
            <ShareDeal />
          </div>
          <span className="text-gray-500 text-sm mb-4">
            Published {deal.createdAt.toDateString()}
          </span>

          <div className="text-gray-900 mb-4 w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-3xl">
            {deal.title}
          </div>

          <div className="flex gap-2 items-center w-full">
            <p className="text-orange-500 text-3xl font-bold">{deal.price}zł</p>
            <p className="text-gray-500 text-2xl font-bold line-through">
              {deal.nextBestPrice}zł
            </p>
            {discountPercentage !== null && (
              <p className="text-2xl">-{discountPercentage}%</p>
            )}
          </div>
          <div className="flex items-center gap-2  mb-4">
            <Truck color="gray" size={24} />
            <div className="text-stone-500 text-sm">
              {deal.shippingPrice ? (
                <p>{deal.shippingPrice}zł</p>
              ) : (
                <p> Free Shipping </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:gap-4 lg:flex-row items-center justify-between">
          <Link
            className="w-full"
            href={deal.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="w-full text-xl rounded-full py-6"
              variant="orange"
            >
              View Deal
            </Button>
          </Link>
          {deal.promoCode && (
            <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
              <button
                value={deal.promoCode}
                onClick={(e) => handleCopyToClipboard(e.currentTarget.value)}
                className="flex text-xl py-6 overflow-hidden text-ellipsis whitespace-nowrap border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
              >
                <Scissors size={20} />
                {deal.promoCode}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DealDetails;
