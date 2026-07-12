import ProfileDetailsLine from "@/components/Profile/ProfileDetailsLine";
import ProfileSocials from "@/components/Profile/ProfileSocials";

import { calculateAge, formatDate } from "@/utils/helpers";

import { User as UserType } from "@/utils/types";
import { VenusAndMars, Mail, Flag, User, Cake } from "lucide-react";

async function ProfileDetails({ user }: { user: UserType }) {
  // Destructure the user
  const { email, bio, birthday, gender, country, showEmail } = user;

  // Format birth date
  const dateBirth = birthday ? formatDate(new Date(birthday)) : "Unknown";

  // Returned JSX
  return (
    <div className="flex flex-col gap-y-1">
      <h5 className="text-xl font-medium">Details:</h5>
      {showEmail && (
        <ProfileDetailsLine icon={<Mail />} label="Email" className="mb-3">
          {email}
        </ProfileDetailsLine>
      )}

      <ProfileDetailsLine icon={<Cake />} label="Birthday">
        {dateBirth}{" "}
        {birthday && (
          <span className="text-sm hidden xs:inline-block">
            ({calculateAge(dateBirth)} years)
          </span>
        )}
      </ProfileDetailsLine>
      <ProfileDetailsLine icon={<VenusAndMars />} label="Gender">
        {gender}
      </ProfileDetailsLine>
      <ProfileDetailsLine icon={<Flag />} label="Country" className="mb-3">
        {country || "Unknown"}
      </ProfileDetailsLine>
      <div className="mb-4 max-w-[550px]">
        <ProfileDetailsLine icon={<User />} label="About" column={true}>
          {bio || "No info on user"}
        </ProfileDetailsLine>
      </div>
      <div>
        <div className="text-xl font-poppins">Social accounts:</div>
        <ProfileSocials user={user} />
      </div>
    </div>
  );
}

export default ProfileDetails;
