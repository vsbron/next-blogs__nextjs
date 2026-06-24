import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import SectionTitle from "@/components/SectionTitle";
import AddEditPostForm from "@/components/dashboard/AddEditPostForm";
import SkeletonEditPost from "@/components/skeletons/SkeletonEditPost";
import { fetchPost } from "@/utils/actions/posts";
import { SITE_NAME } from "@/utils/constants";

// Interface for the Post ID
interface SinglePostPageProps {
  params: Promise<{ id: string }>;
}

// Metadata
export const metadata: Metadata = {
  title: "Edit Post",
  description: `Update your existing post on ${SITE_NAME}.`,
};

// The page
async function EditPostPage({ params }: SinglePostPageProps) {
  // Get the ID a nd userId from the params and auth
  const { id } = await params;
  const { userId } = await auth();

  // Guard clause
  if (!userId) redirect("/");

  // Returned JSX
  return (
    <section>
      <SectionTitle>Edit published post</SectionTitle>
      <Suspense fallback={<SkeletonEditPost />}>
        <PostFormLoader postId={id} userId={userId} />
      </Suspense>
    </section>
  );
}

// Helper function props type
interface PostFormLoaderProps {
  postId: string;
  userId: string;
}
// Helper function
async function PostFormLoader({ postId, userId }: PostFormLoaderProps) {
  // Fetch the post data
  const post = await fetchPost(postId);

  // Guard clauses
  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) redirect("/dashboard/my-posts/");

  // Returned JSX
  return <AddEditPostForm defaultValues={post} />;
}

export default EditPostPage;
