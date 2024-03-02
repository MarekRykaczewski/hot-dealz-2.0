"use client";

import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import DealDescriptionForm from "./deal-description-form";
import DealFinalForm from "./deal-final-form";
import DealInfo from "./deal-info-form";
import DealLinkForm from "./deal-link-form";
import Review from "./review";
import SideBar from "./side-bar";

interface DealFormProps {
  categories: Category[];
}

const DealForm = ({ categories }: DealFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [formCompletion, setFormCompletion] = useState(Array(5).fill(false));

  const router = useRouter();

  const updateFormData = (data: {}) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const updateFormCompletion = (stepIndex: number, isCompleted: boolean) => {
    setFormCompletion((prevCompletion) => {
      const newCompletion = [...prevCompletion];
      newCompletion[stepIndex] = isCompleted;
      return newCompletion;
    });
  };

  const handleFormStep = (form: UseFormReturn<any>) => {
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
      const response = await axios.post("/api/deals", formData);
      router.push(`/deals/${response.data.id}`);
      toast.success("Deal Created!");
    } catch {
      toast.error("Something went wrong");
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
        {currentStep === 0 && <DealLinkForm handleFormStep={handleFormStep} />}
        {currentStep === 1 && <DealInfo handleFormStep={handleFormStep} />}
        {currentStep === 2 && <div> TODO </div>}
        {currentStep === 3 && (
          <DealDescriptionForm handleFormStep={handleFormStep} />
        )}
        {currentStep === 4 && (
          <DealFinalForm handleFormStep={handleFormStep} options={categories} />
        )}
        {currentStep === 5 && (
          <Review onSubmit={onSubmit} formData={formData} />
        )}
      </div>
    </div>
  );
};

export default DealForm;
