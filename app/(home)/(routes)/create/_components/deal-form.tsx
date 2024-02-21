"use client";

import { Category } from "@prisma/client";
import { useState } from "react";
import DealDescriptionForm from "./deal-description-form";
import DealFinalForm from "./deal-final-form";
import DealInfo from "./deal-info-form";
import DealLinkForm from "./deal-link-form";
import SideBar from "./side-bar";

interface DealFormProps {
  categories: Category[];
}

const DealForm = ({ categories }: DealFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (data: {}) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex w-full">
      <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex flex-col mb-[25vh] p-6 w-full items-center justify-center">
        {currentStep === 0 && (
          <DealLinkForm
            updateFormData={updateFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 1 && (
          <DealInfo
            updateFormData={updateFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && <div> TODO </div>}
        {currentStep === 3 && (
          <DealDescriptionForm
            updateFormData={updateFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && (
          <DealFinalForm
            updateFormData={updateFormData}
            options={categories}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
};

export default DealForm;
