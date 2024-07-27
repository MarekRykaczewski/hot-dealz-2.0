import { cn } from "@/lib/utils";
import { Hourglass, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const DealOwnerBanner = ({
  isPublished,
  dealId,
  toggleEditMode,
}: {
  isPublished: boolean;
  dealId: string;
  toggleEditMode: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/deals/${dealId}/archive`, {
        method: "PATCH",
      });

      if (response.ok) {
        toast.success(
          isPublished
            ? "Deal archived successfully!"
            : "Deal renewed successfully!"
        );
        window.location.reload();
      } else {
        toast.error("Failed to update deal status.");
      }
    } catch (error) {
      console.error("Error archiving deal:", error);
      toast.error("Failed to update deal status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={"flex items-center justify-between bg-white rounded-lg p-6"}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">Status</span>
        <div
          className={cn(
            "bg-emerald-500 text-sm text-white py-1 px-4 rounded-full",
            !isPublished && "bg-red-500"
          )}
        >
          {isPublished ? "Active" : "Archived"}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className="flex gap-2"
          variant={"orange"}
          onClick={toggleEditMode}
        >
          <Pencil />
          Edit
        </Button>
        <Button
          className="flex gap-2"
          variant={"orange"}
          onClick={handleArchive}
          disabled={loading}
        >
          <Hourglass />
          {loading ? "Processing..." : isPublished ? "Archive" : "Renew"}
        </Button>
      </div>
    </div>
  );
};

export default DealOwnerBanner;
