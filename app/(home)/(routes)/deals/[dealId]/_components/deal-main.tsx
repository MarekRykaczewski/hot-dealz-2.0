"use client";

import DealDetails from "@/components/deal-details";
import DealOwnerBanner from "@/components/deal-owner-banner";
import DealStatusBanner from "@/components/deal-status-banner";
import Preview from "@/components/preview";
import SavedDealButton from "@/components/saved-deal-button";
import { DealBase } from "@/types";
import { useState } from "react";

const DealMain = ({
  isDealOwner,
  deal,
}: {
  isDealOwner: boolean;
  deal: DealBase;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      {isDealOwner && (
        <DealOwnerBanner
          isPublished={deal.isPublished}
          dealId={deal.id}
          toggleEditMode={toggleEditMode}
        />
      )}
      {<DealStatusBanner deal={deal} />}
      <div className="flex sm:flex-row gap-2 flex-col bg-white rounded-lg p-6">
        <DealDetails
          deal={deal}
          isEditing={isEditing}
          toggleEditMode={toggleEditMode}
        />
      </div>
      <div className="flex flex-col gap-2 bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold">About this deal</h2>
        <Preview value={deal.description} />
        <SavedDealButton dealId={deal.id} />
      </div>
    </div>
  );
};

export default DealMain;
