import { Deal } from "@prisma/client";
import DealCard from "./deal-card";

const DealsList = ({ deals }: { deals: Deal[] }) => {
  return (
    <div>
      <div>
        {deals.map((deal: Deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default DealsList;
