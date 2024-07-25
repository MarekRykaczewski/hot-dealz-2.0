import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";

const CategoryCrumbs = async ({
  categoryId,
}: {
  categoryId: string | null;
}) => {
  const breadcrumbs: ({
    parentCategory: {
      id: string;
      name: string;
      parentId: string | null;
    } | null;
  } & { id: string; name: string; parentId: string | null })[] = [];

  const fetchCategoryHierarchy = async (categoryId: string) => {
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

  if (categoryId) await fetchCategoryHierarchy(categoryId);

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
