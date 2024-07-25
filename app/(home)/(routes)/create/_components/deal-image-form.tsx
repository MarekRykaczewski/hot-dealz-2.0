"use client";

import { Button } from "@/components/ui/button";
import { FormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

// Adjust the schema to match `FormData`
const DealImageFormSchema = z.object({
  imageUrls: z.array(z.string()).nonempty("At least one image URL is required"),
});

interface DealImageFormProps {
  handleFormStep: (form: UseFormReturn<FormData>) => void;
  formData: FormData;
  setSelectedFile: (file: File) => void;
}

const DealImageForm = ({
  handleFormStep,
  formData,
  setSelectedFile,
}: DealImageFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Ensure the form type matches the `FormData` interface
  const form = useForm<FormData>({
    resolver: zodResolver(DealImageFormSchema),
    defaultValues: {
      ...formData, // Ensure all required fields are provided
      imageUrls: formData.imageUrls,
    },
  });

  useEffect(() => {
    if (formData.imageUrls.length > 0) {
      setImagePreview(formData.imageUrls[0]);
    }
  }, [formData.imageUrls]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        const currentImageUrls = form.getValues("imageUrls");
        form.setValue("imageUrls", [...currentImageUrls, imageUrl]); // Append to existing image URLs
        setSelectedFile(file); // Update parent component with selected file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Deal Image</h1>
      <p className="text-lg text-center text-slate-600">
        Upload an image for the deal
      </p>

      {imagePreview && (
        <div className="relative text-center h-64 w-full border rounded-xl bg-gray-100">
          <Image
            src={imagePreview}
            alt="Preview"
            objectFit="contain"
            layout="fill"
          />
        </div>
      )}

      <div className="flex justify-center mt-4 mb-4">
        <label htmlFor="imageUpload">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Upload Image
          </span>
        </label>
      </div>

      <div className="flex items-center gap-x-2">
        <Button type="button" variant="ghost">
          Back
        </Button>
        <Button onClick={() => handleFormStep(form)} type="button">
          Continue
        </Button>
      </div>
    </>
  );
};

export default DealImageForm;
