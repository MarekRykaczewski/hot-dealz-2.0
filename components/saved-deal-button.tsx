"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const SavedDealButton = ({ dealId }: { dealId: string }) => {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);

  const checkSavedDeal = async () => {
    try {
      const response = await axios.get(`/api/deals/${dealId}/saved`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error("Error checking saved deal:", error);
    }
  };

  const toggleSavedDeal = async () => {
    try {
      if (isSaved) {
        await axios.delete(`/api/deals/${dealId}/save`);
      } else {
        await axios.post(`/api/deals/${dealId}/save`);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling saved deal:", error);
    }
  };

  useEffect(() => {
    if (user) {
      checkSavedDeal();
    }
  }, [user, dealId]);

  return (
    <Button onClick={toggleSavedDeal} variant={"orange"}>
      {isSaved ? <Bookmark fill="white" size={18} /> : <Bookmark size={18} />}
      <span className="ml-2">{isSaved ? "Saved" : "Save"}</span>
    </Button>
  );
};

export default SavedDealButton;
