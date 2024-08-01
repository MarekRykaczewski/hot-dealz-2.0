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
import ProgressBar from "./progress-bar";
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async () => {
    try {
      let uploadedImageUrls = formData.imageUrls;
      if (selectedFiles.length > 0) {
        const uploadResponse = await uploadFiles("dealImageUploader", {
          files: selectedFiles,
        });

        const newUploadedUrls = uploadResponse.map((response) => response.url);
        uploadedImageUrls = [...uploadedImageUrls, ...newUploadedUrls];
      }

      const formDataWithImages = {
        ...formData,
        imageUrls: uploadedImageUrls,
      };

      const response = await axios.post("/api/deals", formDataWithImages);
      router.push(`/deals/${response.data.id}`);
      toast.success("Deal Created!");
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
        return (
          <DealInfo
            handleFormStep={handleFormStep}
            handleBackStep={handleBackStep}
            formData={formData}
          />
        );
      case 2:
        return (
          <DealImageForm
            handleFormStep={handleFormStep}
            handleBackStep={handleBackStep}
            formData={formData}
            setSelectedFiles={setSelectedFiles}
          />
        );
      case 3:
        return (
          <DealDescriptionForm
            handleFormStep={handleFormStep}
            handleBackStep={handleBackStep}
            formData={formData}
          />
        );
      case 4:
        return (
          <DealFinalForm
            handleFormStep={handleFormStep}
            handleBackStep={handleBackStep}
            options={categories}
            formData={formData}
          />
        );
      case 5:
        return (
          <Review
            handleBackStep={handleBackStep}
            onSubmit={onSubmit}
            formData={formData}
            categories={categories}
            allStepsComplete={formCompletion.slice(0, -1).every(Boolean)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <ProgressBar stepCompletion={formCompletion} />
      <div className="flex sm:flex-row flex-col w-full h-[calc(100vh-88px)]">
        <div className="sm:w-1/3">
          <SideBar
            formCompletion={formCompletion}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        <div className="flex flex-col items-center p-6 w-full justify-start">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default DealForm;
