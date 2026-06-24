import { Metadata } from "next";
import { Suspense } from "react";

import SectionTitle from "@/components/SectionTitle";
import AllAuthors from "@/components/AuthorList/AllAuthors";
import SkeletonAuthorList from "@/components/skeletons/SkeletonAuthorList";

import { SITE_DOMAIN, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "All Authors",
  description:
    `Discover every author on ${SITE_NAME} - explore all stories, insights, and ideas from our community of writers.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/authors`,
  },
};

function AllAuthorsPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>All Authors</SectionTitle>
      <Suspense fallback={<SkeletonAuthorList />}>
        <AllAuthors />
      </Suspense>
    </section>
  );
}

export default AllAuthorsPage;
