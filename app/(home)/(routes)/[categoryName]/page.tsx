import DealsList from "@/components/deals-list";
import { db } from "@/lib/db";
import FilterCategory from "../../_components/filter-category";

const CategoryPage = async ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const { categoryName } = params;
  const deals = await db.deal.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
  });

  return (
    <main className="flex flex-col items-center w-full">
      <FilterCategory />
      <DealsList deals={deals} />
    </main>
  );
};

export default CategoryPage;
