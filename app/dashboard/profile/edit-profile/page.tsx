import { Metadata } from "next";
import { redirect } from "next/navigation";

import SectionTitle from "@/components/SectionTitle";
import EditProfile from "@/components/dashboard/EditProfile";

import { fetchCurrentUser } from "@/utils/actions/users";
import { SITE_NAME } from "@/utils/constants";

// Metadata
export const metadata: Metadata = {
  title: "Edit profile details",
  description:
    `Update your personal details, avatar and social links on ${SITE_NAME}.`,
};

// The page
async function EditProfilePage() {
  // Get current user
  const user = await fetchCurrentUser();

  // Guard clause
  if (!user) redirect("/");

  // Returned JSX
  return (
    <>
      <SectionTitle>Edit profile details</SectionTitle>
      <EditProfile user={user} />
    </>
  );
}

export default EditProfilePage;
