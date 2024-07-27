import { DealBase } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const DealEditForm = ({
  deal,
  toggleEditMode,
}: {
  deal: DealBase;
  toggleEditMode: () => void;
}) => {
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
        <label htmlFor="promoCode" className="text-gray-700 font-semibold mb-2">
          Promo Code
        </label>
        <input
          id="promoCode"
          name="promoCode"
          type="text"
          value={editedDeal.promoCode || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <Button className="w-full" variant="orange">
        Save
      </Button>
    </form>
  );
};

export default DealEditForm;
