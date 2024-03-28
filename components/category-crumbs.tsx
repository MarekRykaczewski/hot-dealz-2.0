import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";

const CategoryCrumbs = async ({ categoryId }: { categoryId: string }) => {
  const breadcrumbs = [];

  const fetchCategoryHierarchy = async (categoryId) => {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        parentCategory: true,
      },
    });

    if (category) {
      breadcrumbs.unshift(category);
      if (category.parentCategory) {
        await fetchCategoryHierarchy(category.parentCategory.id);
      }
    }
  };

  await fetchCategoryHierarchy(categoryId);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-white">
        <BreadcrumbItem>
          <BreadcrumbLink
            className="hover:underline hover:text-white"
            href={`/`}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <ChevronRight color="white" size={16} />
        {breadcrumbs.map((category, index) => (
          <React.Fragment key={category.id}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:underline hover:text-white"
                href={`/?${category.name}`}
              >
                {category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight color="white" size={16} />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CategoryCrumbs;
