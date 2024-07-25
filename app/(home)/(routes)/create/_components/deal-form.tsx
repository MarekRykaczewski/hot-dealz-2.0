"use client";

import { uploadFiles } from "@/lib/uploadthing";
import { FormData } from "@/types";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import DealDescriptionForm from "./deal-description-form";
import DealFinalForm from "./deal-final-form";
import DealImageForm from "./deal-image-form";
import DealInfo from "./deal-info-form";
import DealLinkForm from "./deal-link-form";
import Review from "./review";
import SideBar from "./side-bar";

interface DealFormProps {
  categories: Category[];
}

const DealForm = ({ categories }: DealFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    link: "",
    title: "",
    description: "",
    category: "",
    imageUrls: [],
    categoryId: "",
    price: 0,
    nextBestPrice: 0,
    promoCode: "",
    shippingPrice: 0,
    startDate: undefined,
    endDate: undefined,
  });
  const [formCompletion, setFormCompletion] = useState(Array(6).fill(false));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const updateFormCompletion = (stepIndex: number, isCompleted: boolean) => {
    setFormCompletion((prevCompletion) => {
      const newCompletion = [...prevCompletion];
      newCompletion[stepIndex] = isCompleted;
      return newCompletion;
    });
  };

  const handleFormStep = (form: UseFormReturn<FormData>) => {
    form.trigger().then((isValid: boolean) => {
      if (isValid) {
        const formData = form.getValues();
        updateFormData(formData);
        updateFormCompletion(currentStep, true);
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Form validation failed");
      }
    });
  };

  const onSubmit = async () => {
    try {
      // Upload image only if it exists
      if (selectedFile) {
        const uploadResponse = await uploadFiles("dealImageUploader", {
          files: [selectedFile],
        });

        const uploadedImageUrl = uploadResponse[0].url;

        // Update formData with the uploaded image URL
        const formDataWithImage = {
          ...formData,
          imageUrls: [...formData.imageUrls, uploadedImageUrl], // Append the new image URL
        };

        // Submit the form data with the uploaded image
        const response = await axios.post("/api/deals", formDataWithImage);
        router.push(`/deals/${response.data.id}`);
        toast.success("Deal Created!");
      } else {
        // Submit the form data without the image
        const response = await axios.post("/api/deals", formData);
        router.push(`/deals/${response.data.id}`);
        toast.success("Deal Created!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DealLinkForm handleFormStep={handleFormStep} formData={formData} />
        );
      case 1:
        return <DealInfo handleFormStep={handleFormStep} formData={formData} />;
      case 2:
        return (
          <DealImageForm
            handleFormStep={handleFormStep}
            formData={formData}
            setSelectedFile={setSelectedFile}
          />
        );
      case 3:
        return (
          <DealDescriptionForm
            handleFormStep={handleFormStep}
            formData={formData}
          />
        );
      case 4:
        return (
          <DealFinalForm
            handleFormStep={handleFormStep}
            options={categories}
            formData={formData}
          />
        );
      case 5:
        return (
          <Review
            onSubmit={onSubmit}
            formData={formData}
            categories={categories}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full">
      <SideBar
        formCompletion={formCompletion}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="flex flex-col mb-[25vh] p-6 w-full items-center justify-center">
        {renderStep()}
      </div>
    </div>
  );
};

export default DealForm;
