import { Metadata } from "next";

import SectionTitle from "@/components/SectionTitle";
import AddEditPostForm from "@/components/dashboard/AddEditPostForm";

import { SITE_NAME } from "@/utils/constants";

// Metadata
export const metadata: Metadata = {
  title: "Add a Post",
  description:
    `Create and publish new articles to share your stories with the ${SITE_NAME} community.`,
};

// The page
function AddPostPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Add a new post</SectionTitle>
      <AddEditPostForm />
    </section>
  );
}

export default AddPostPage;
