"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

  const formSchema = z.object({
    link: z.string().url({ message: "Invalid URL" }).min(1, {
      message: "Link is required",
    }),
    title: z.string().min(1),
    price: z.number(),
    nextBestPrice: z.number(),
    promoCode: z.string(),
    shippingCost: z.number(),
    description: z.string().max(500),
    startDate: z.date(),
    endDate: z.date(),
    category: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  return (
    <div className="flex w-full">
      <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex flex-col mb-[25vh] p-6 w-full items-center justify-center">
        {currentStep === 0 && (
          <DealLinkForm
            form={form}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 1 && (
          <DealInfo
            form={form}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && <div> TODO </div>}
        {currentStep === 3 && (
          <DealDescriptionForm
            form={form}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && (
          <DealFinalForm
            form={form}
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
