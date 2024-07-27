import { DealBase } from "@/types";
import { Scissors, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import DealImageCarousel from "./deal-image-carousel";
import { ShareDeal } from "./share-deal";
import { Button } from "./ui/button";
import UserProfileLink from "./user-profile-link";
import Vote from "./vote";

const DealDetails = ({
  deal,
  isEditing,
  toggleEditMode,
}: {
  deal: DealBase;
  isEditing: boolean;
  toggleEditMode: () => void;
}) => {
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

  const [editedDeal, setEditedDeal] = useState(deal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/deals/${deal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDeal),
      });

      if (response.ok) {
        toggleEditMode();
        toast.success("Deal updated successfully!");
      } else {
        toast.error("Failed to update deal.");
      }
    } catch (error) {
      console.error("Error updating deal:", error);
      toast.error("Failed to update deal.");
    }
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={editedDeal.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 font-semibold mb-2">
              Price (zł)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={editedDeal.price || 0}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="nextBestPrice"
              className="text-gray-700 font-semibold mb-2"
            >
              Next Best Price (zł)
            </label>
            <input
              id="nextBestPrice"
              name="nextBestPrice"
              type="number"
              value={editedDeal.nextBestPrice || 0}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="shippingPrice"
              className="text-gray-700 font-semibold mb-2"
            >
              Shipping Price (zł)
            </label>
            <input
              id="shippingPrice"
              name="shippingPrice"
              type="number"
              value={editedDeal.shippingPrice || 0}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="shippingPrice"
              className="text-gray-700 font-semibold mb-2"
            >
              Promo Code
            </label>
            <input
              id="promoCode"
              name="promoCode"
              type="text"
              value={editedDeal.promoCode || 0}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <Button className="w-full" variant="orange">
            Save
          </Button>
        </form>
      ) : (
        <>
          <div className="max-h-96 sm:w-2/5 mr-3 bg-gray-100 border overflow-hidden rounded-xl">
            <DealImageCarousel imageUrls={deal.imageUrls} />
          </div>
          <div className="bg-white flex-grow px-0 flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600 flex justify-between">
                <Vote
                  userId={deal.userId}
                  dealId={deal.id}
                  score={deal.score}
                />
                <ShareDeal />
              </div>
              <span className="text-gray-500 text-sm mb-4">
                Published {deal.createdAt.toDateString()}
              </span>

              <div className="text-gray-900 mb-4 w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-3xl">
                {deal.title}
              </div>

              <div className="flex gap-2 items-center w-full">
                <p className="text-orange-500 text-3xl font-bold">
                  {deal.price}zł
                </p>
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
                    onClick={(e) =>
                      handleCopyToClipboard(e.currentTarget.value)
                    }
                    className="flex text-xl py-6 overflow-hidden text-ellipsis whitespace-nowrap border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
                  >
                    <Scissors size={20} />
                    {deal.promoCode}
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Shared by</span>
              <UserProfileLink username={deal.user.username} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DealDetails;
