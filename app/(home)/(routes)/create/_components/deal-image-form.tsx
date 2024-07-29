"use client";

import { Button } from "@/components/ui/button";
import { FormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

const DealImageFormSchema = z.object({
  imageUrls: z.array(z.string()).nonempty("At least one image URL is required"),
});

interface DealImageFormProps {
  handleFormStep: (form: UseFormReturn<FormData>) => void;
  formData: FormData;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const DealImageForm = ({
  handleFormStep,
  formData,
  setSelectedFiles,
}: DealImageFormProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(DealImageFormSchema),
    defaultValues: {
      ...formData,
      imageUrls: formData.imageUrls,
    },
  });

  useEffect(() => {
    if (formData.imageUrls.length > 0) {
      setImagePreviews(formData.imageUrls);
    }
  }, [formData.imageUrls]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPreviews: string[] = [];
      const fileList: File[] = Array.from(files);
      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          newPreviews.push(imageUrl);
          if (newPreviews.length === fileList.length) {
            setImagePreviews((prevPreviews) => [
              ...prevPreviews,
              ...newPreviews,
            ]);
            const currentImageUrls = form.getValues("imageUrls");
            form.setValue("imageUrls", [...currentImageUrls, ...newPreviews]);
            setSelectedFiles((prevFiles: File[]) => [
              ...prevFiles,
              ...fileList,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Deal Image</h1>
      <p className="text-lg text-center text-slate-600">
        Upload images for the deal
      </p>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagePreviews.map((image, index) => (
            <div
              key={index}
              className="relative text-center h-64 w-64 border rounded-xl bg-gray-100"
            >
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                objectFit="contain"
                layout="fill"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4 mb-4">
        <label htmlFor="imageUpload">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            multiple // Allow multiple files
            onChange={handleFileInputChange}
          />
          <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Upload Images
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
