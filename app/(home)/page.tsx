import DealsList from "@/components/deals-list";
import { db } from "@/lib/db";
import FilterCategory from "./_components/filter-category";

export default async function Home() {
  const deals = await db.deal.findMany();

  return (
    <main className="flex flex-col items-center w-full">
      <FilterCategory />
      <DealsList deals={deals} />
    </main>
  );
}
