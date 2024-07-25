"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormData } from "@/types";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ReviewProps {
  onSubmit: () => void;
  formData: FormData;
  categories: Category[];
}

const Review = ({ onSubmit, formData, categories }: ReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const fields: { fieldName: keyof FormData; displayName: string }[] = [
    { fieldName: "link", displayName: "Link" },
    { fieldName: "title", displayName: "Title" },
    { fieldName: "price", displayName: "Price" },
    { fieldName: "nextBestPrice", displayName: "Next Best Price" },
    { fieldName: "promoCode", displayName: "Promo Code" },
    { fieldName: "shippingPrice", displayName: "Shipping Cost" },
    { fieldName: "startDate", displayName: "Start Date" },
    { fieldName: "endDate", displayName: "End Date" },
    { fieldName: "description", displayName: "Description" },
    { fieldName: "categoryId", displayName: "Category" },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Review</h1>
      <p className="text-lg text-center text-gray-700 mb-6">
        Please review your information before submitting:
      </p>

      {/* Display multiple images if available */}
      {formData.imageUrls.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {formData.imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative bg-gray-100 border rounded-xl w-full h-64"
            >
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                objectFit="contain"
                fill
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {fields.map((field, index) => (
          <span key={index} className="font-medium">
            {field.displayName}:{" "}
            {(() => {
              switch (field.fieldName) {
                case "link":
                  return (
                    <div className="truncate">
                      <Link
                        href={formData[field.fieldName] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {formData[field.fieldName]}
                      </Link>
                    </div>
                  );
                case "startDate":
                case "endDate":
                  return <span>{formatDate(formData[field.fieldName])}</span>;
                case "categoryId":
                  return (
                    <span>{getCategoryName(formData[field.fieldName])}</span>
                  );
                default:
                  return <span>{formData[field.fieldName]}</span>;
              }
            })()}
          </span>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        type="button"
        disabled={isLoading}
        className={cn(
          "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default Review;
