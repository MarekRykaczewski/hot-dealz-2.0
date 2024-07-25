import { DealWithComments } from "@/types";
import DealCard from "./deal-card";

const DealsList = ({ deals }: { deals: DealWithComments[] }) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-2">
        {deals.map((deal: DealWithComments) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default DealsList;
