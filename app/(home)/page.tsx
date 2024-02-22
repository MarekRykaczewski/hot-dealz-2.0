import DealsList from "@/components/deals-list";
import { db } from "@/lib/db";

export default async function Home() {
  const deals = await db.deal.findMany();

  return (
    <main>
      <DealsList deals={deals} />
    </main>
  );
}
