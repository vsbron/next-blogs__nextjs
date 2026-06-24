import { Metadata } from "next";
import { Suspense } from "react";

import SectionTitle from "@/components/SectionTitle";
import SearchResults from "@/components/Search/SearchResults";
import SkeletonSearch from "@/components/skeletons/SkeletonSearch";

import { SITE_DOMAIN, SITE_NAME } from "@/utils/constants";

// Interface for the User ID
interface SearchPageProps {
  searchParams: Promise<{ query: string }>;
}

// Generate metadata function
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  // Get the query from search params
  const { query } = await searchParams;

  // Returned Metadata
  return {
    title: `${query ? query + " - " : ""} Search Results`,
    description:
      `Browse posts matching your search query on ${SITE_NAME}. Find articles, authors, and trending content quickly with powerful filters and a clean reading experience.`,
    alternates: {
      canonical: `${SITE_DOMAIN}/search`,
    },
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  // Get the query from search params
  const { query } = await searchParams;

  // Returned JSX
  return (
    <section>
      <SectionTitle>{query ? query + " - " : ""} Search Results</SectionTitle>
      <Suspense fallback={<SkeletonSearch />}>
        <SearchResults />
      </Suspense>
    </section>
  );
}

export default SearchPage;
