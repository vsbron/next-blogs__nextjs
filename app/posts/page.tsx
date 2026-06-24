import { Metadata } from "next";
import { Suspense } from "react";

import SectionTitle from "@/components/SectionTitle";
import AllPostsPageContent from "@/components/PostLists/AllPostsPageContent";
import SkeletonPostsGrid from "@/components/skeletons/SkeletonPostsGrid";

import { SITE_DOMAIN, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "All Posts",
  description:
    `Discover every post on ${SITE_NAME} - explore all stories, insights, and ideas from our community of writers.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/posts`,
  },
};

function AllPostsPage() {
  // Returned JSX
  return (
    <Suspense
      fallback={
        <>
          <SectionTitle>All Posts</SectionTitle>
          <SkeletonPostsGrid />
        </>
      }
    >
      <AllPostsPageContent />
    </Suspense>
  );
}

export default AllPostsPage;
