import { cn } from "@/lib/utils";
import { Hourglass, Pencil } from "lucide-react";
import { Button } from "./ui/button";

const DealOwnerBanner = ({
  isPublished,
  toggleEditMode,
}: {
  isPublished: boolean;
  toggleEditMode: () => void;
}) => {
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
        <Button className="flex gap-2" variant={"orange"}>
          <Hourglass />
          {isPublished ? "Archive" : "Renew"}
        </Button>
      </div>
    </div>
  );
};

export default DealOwnerBanner;
