import { Metadata } from "next";
import { Suspense } from "react";

import SectionTitle from "@/components/SectionTitle";
import TrendingPosts from "@/components/PostLists/TrendingPosts";
import SkeletonPostsList from "@/components/skeletons/SkeletonPostsList";

import { SITE_DOMAIN, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "Trending Posts",
  description:
    `Explore the hottest posts on ${SITE_NAME} - trending stories and popular reads shared by our community.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/hot-posts`,
  },
};

function HotPostsPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Trending Posts</SectionTitle>
      <Suspense fallback={<SkeletonPostsList />}>
        <TrendingPosts />
      </Suspense>
    </section>
  );
}

export default HotPostsPage;
