"use client"

import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { DEFAULT_BG_COLOR } from "../../../constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const params = useParams()
  const activeCategory = params.category as string | undefined

  const activeCategoryData = data.find((category) => category.slug === activeCategory)

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
  const activeCategoryName = activeCategoryData?.name || null

  const activeSubcategory = params.subcategory as string | undefined
  const activeSubcategoryName = activeCategoryData?.subcategories.find((subcategory) => subcategory.slug === activeSubcategory)?.name || null

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>

      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  )
}

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disable />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  )
}
