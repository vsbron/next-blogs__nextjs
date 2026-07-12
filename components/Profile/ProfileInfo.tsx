import Link from "next/link";
import Image from "next/image";

import ProfileStats from "@/components/Profile/ProfileStats";
import { ButtonsContainer } from "@/components/form/Buttons";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import ProfileTopPosts from "@/components/Profile/ProfileTopPosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { User } from "@/utils/types";
import defaultAvatar from "@/assets/defaultUser.png";

// Props type
type ProfileInfoProps = {
  user: User;
  editBtns?: boolean;
};

// The component
function ProfileInfo({ user, editBtns = false }: ProfileInfoProps) {
  // Destructure user
  const { clerkId, imageUrl, displayName, username } = user;

  // Returned JSX
  return (
    <>
      <div className="flex items-center gap-x-6 mt-2 mb-4">
        <div className="w-22 h-22 relative">
          <Image
            src={imageUrl || defaultAvatar}
            fill
            alt={displayName || "Unknown user"}
            sizes="100px"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col items-start font-poppins">
          <h2 className="text-3xl">{displayName}</h2>
          <h4 className="text-2xl text-foreground/50">{username}</h4>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1.2fr_1fr] items-start gap-8 max-w-225 mb-8">
        <Card>
          <CardContent>
            <ProfileDetails user={user} />
            {editBtns && (
              <ButtonsContainer>
                <Button asChild>
                  <Link href="/dashboard/profile/edit-credentials/">
                    Change credentials/avatar
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard/profile/edit-profile/">
                    Edit profile details
                  </Link>
                </Button>
              </ButtonsContainer>
            )}
          </CardContent>
        </Card>
        <ProfileStats userId={clerkId} dateCreated={user.dateCreated} />
      </div>
      <ProfileTopPosts userId={clerkId} />
    </>
  );
}

export default ProfileInfo;
