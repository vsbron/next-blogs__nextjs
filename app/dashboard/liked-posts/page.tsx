import { Metadata } from "next";
import { Suspense } from "react";

import SectionTitle from "@/components/SectionTitle";
import LikePosts from "@/components/dashboard/LikedPosts";
import SkeletonPostsGrid from "@/components/skeletons/SkeletonPostsGrid";

import { SITE_NAME } from "@/utils/constants";

// Metadata
export const metadata: Metadata = {
  title: "Liked posts",
  description:
    `Discover and keep track of your favorite articles from the ${SITE_NAME} community.`,
};

// The page
function LikedPostsPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Posts you liked</SectionTitle>
      <Suspense fallback={<SkeletonPostsGrid />}>
        <LikePosts />
      </Suspense>
    </section>
  );
}

export default LikedPostsPage;
