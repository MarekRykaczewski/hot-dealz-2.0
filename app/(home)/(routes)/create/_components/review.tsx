import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ReviewProps {
  onSubmit: () => void;
  formData: {};
  categories: Category[];
}

const Review = ({ onSubmit, formData, categories }: ReviewProps) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const formatDate = (dateString: string) => {
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

  const fields = [
    { fieldName: "link", displayName: "Link" },
    { fieldName: "title", displayName: "Title" },
    { fieldName: "price", displayName: "Price" },
    { fieldName: "nextBestPrice", displayName: "Next Best Price" },
    { fieldName: "promoCode", displayName: "Promo Code" },
    { fieldName: "shippingCost", displayName: "Shipping Cost" },
    { fieldName: "startDate", displayName: "Start Date" },
    { fieldName: "endDate", displayName: "End Date" },
    { fieldName: "description", displayName: "Description" },
    { fieldName: "categoryId", displayName: "Category" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Review</h1>
      <p className="text-lg text-center text-gray-700 mb-6">
        Please review your information before submitting:
      </p>
      {formData.imageUrl && (
        <div className="relative bg-gray-100 border rounded-xl w-full h-64 mb-4">
          <Image
            src={formData.imageUrl}
            alt="Product"
            objectFit="contain"
            fill
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {fields.map((field, index) => (
          <span key={index}>
            {field.displayName}:{" "}
            {(() => {
              switch (field.fieldName) {
                case "link":
                  return (
                    <div className="truncate">
                      <Link
                        href={formData[field.fieldName]}
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
        onClick={() => onSubmit()}
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
      >
        Submit
      </Button>
    </div>
  );
};

export default Review;
