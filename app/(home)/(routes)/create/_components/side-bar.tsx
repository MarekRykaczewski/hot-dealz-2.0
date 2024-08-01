"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  Image,
  Link,
  ListChecks,
  NotebookText,
  Presentation,
  Sparkles,
} from "lucide-react";

interface SideBarProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
  formCompletion: boolean[];
}

const SideBar = ({
  setCurrentStep,
  currentStep,
  formCompletion,
}: SideBarProps) => {
  const routesMap = [
    {
      title: "Link",
      icon: Link,
    },
    {
      title: "Essential Info",
      icon: Sparkles,
    },
    {
      title: "Image Gallery",
      icon: Image,
    },
    {
      title: "Description",
      icon: NotebookText,
    },
    {
      title: "Final Details",
      icon: ListChecks,
    },
    {
      title: "Review",
      icon: Presentation,
    },
  ];
  return (
    <div className="p-6 sm:border-r text-gray-800 h-full w-full">
      <h1 className="text-2xl font-semibold mb-10">Publish your deal</h1>
      <div className="flex flex-col gap-y-4">
        {routesMap.map((route, index) => (
          <Button
            onClick={() => setCurrentStep(index)}
            className={cn(
              "flex justify-start gap-3 font-semibold",
              currentStep === index && "ring-1 ring-black"
            )}
            variant={formCompletion[index] ? "success" : "ghost"}
            key={route.title}
          >
            {formCompletion[index] ? (
              <Check size={22} />
            ) : (
              <route.icon size={22} />
            )}
            {route.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
