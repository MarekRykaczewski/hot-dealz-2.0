"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image, Link, ListChecks, NotebookText, Sparkles } from "lucide-react";

interface SideBarProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
}

const SideBar = ({ setCurrentStep, currentStep }: SideBarProps) => {
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
  ];
  return (
    <div className="p-6 border-r bg-slate-100 text-gray-800 h-full w-full max-w-xs">
      <h1 className="text-2xl font-semibold mb-10">Publish your deal</h1>
      <div className="flex flex-col gap-y-4">
        {routesMap.map((route, index) => (
          <Button
            onClick={() => setCurrentStep(index)}
            className={cn(
              "flex hover:bg-white justify-start gap-3 font-semibold",
              currentStep === index && "bg-white"
            )}
            variant="ghost"
            key={route.title}
          >
            <route.icon size={22} />
            {route.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
