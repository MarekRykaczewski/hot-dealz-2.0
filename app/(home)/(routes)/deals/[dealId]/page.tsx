import { db } from "@/lib/db";

const DealPage = async ({ params }: { params: { dealId: string } }) => {
  const deal = await db.deal.findUnique({
    where: {
      id: params.dealId,
    },
  });
  return <div>{deal?.title}</div>;
};

export default DealPage;
