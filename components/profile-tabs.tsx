"use client";

import { cn } from "@/lib/utils";
import { Deal } from "@prisma/client";
import { SetStateAction, useState } from "react";
import DealsList from "./deals-list";

const ProfileTabs = ({
  userDeals,
  userSavedDeals,
}: {
  userDeals: Deal[];
  userSavedDeals: Deal[];
}) => {
  const [activeTab, setActiveTab] = useState("userDeals");

  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex gap-4 lg:w-[60vw] font-semibold w-full mt-5 justify-center">
        <button
          className={cn(
            "hover:text-orange-500 relative transition-all duration-200",
            activeTab === "userDeals" && "text-orange-500"
          )}
          onClick={() => handleTabChange("userDeals")}
        >
          My Deals
          {activeTab === "userDeals" && (
            <div className="bg-orange-500 absolute bottom-0 w-full h-0.5" />
          )}
        </button>
        <button
          className={cn(
            "hover:text-orange-500 relative flex flex-col transition-all duration-200",
            activeTab === "userSavedDeals" && "text-orange-500"
          )}
          onClick={() => handleTabChange("userSavedDeals")}
        >
          Saved Deals
          {activeTab === "userSavedDeals" && (
            <div className="bg-orange-500 absolute bottom-0 w-full h-0.5" />
          )}
        </button>
      </div>
      <div className="flex justify-around bg-stone-100 h-full border-y mt-4 pb-4 w-full">
        {activeTab === "userDeals" && <DealsList deals={userDeals} />}
        {activeTab === "userSavedDeals" && <DealsList deals={userSavedDeals} />}
      </div>
    </>
  );
};

export default ProfileTabs;
