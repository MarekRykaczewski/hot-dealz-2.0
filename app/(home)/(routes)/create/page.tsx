import { db } from "@/lib/db";
import DealForm from "./_components/deal-form";

const CreatePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="flex w-full h-full">
      <DealForm categories={categories} />
    </div>
  );
};

export default CreatePage;
