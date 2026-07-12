"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";

import { ButtonsContainer, SubmitButton } from "@/components/form/Buttons";
import DateInput from "@/components/form/DateInput";
import FormInput from "@/components/form/FormInput";
import RadioInput from "@/components/form/RadioInput";
import SelectInput from "@/components/form/SelectInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { updateUserAction } from "@/utils/actions/users";
import { handleFormAction } from "@/utils/helpers";
import { COUNTRIES, GENDERS } from "@/utils/constants";
import { userSchema } from "@/utils/schemas";
import { User } from "@/utils/types";

// Type for form values
type FormValues = {
  username: string;
  displayName: string;
  birthday?: string;
  gender: string;
  country?: string;
  bio?: string;
  website: string;
  facebook: string;
  x: string;
  instagram: string;
  reddit: string;
  showEmail: boolean;
};

// The component
function EditProfile({ user }: { user: User }) {
  // Destructure user object and set the countries list
  const {
    username,
    displayName,
    bio,
    country,
    gender,
    birthday,
    website,
    facebook,
    x,
    instagram,
    reddit,
    showEmail,
  } = user;

  // Get the form values from React-Hook-Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // @ts-expect-error - RHF Control type mismatch after version bump, low priority
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      username,
      displayName,
      birthday: birthday || "",
      gender,
      bio: bio || "",
      country: country || "",
      website: website || "",
      facebook: facebook || "",
      x: x || "",
      instagram: instagram || "",
      reddit: reddit || "",
      showEmail: showEmail ?? false,
    },
  });

  // Get the router
  const router = useRouter();

  // Form submit handler
  const onSubmit = async (data: FormValues) => {
    // Handle the form submission and redirect user if successful
    const result = await handleFormAction(updateUserAction, data);
    if (result.success) router.push("/dashboard/profile");
  };

  // Returned JSX
  return (
    <section>
      <Card className="max-w-112.5">
        <CardContent>
          {/* @ts-expect-error - RHF Control type mismatch after version bump, low priority */}
          <form onSubmit={handleSubmit(onSubmit)} className="basic-form">
            <FormInput
              id="username"
              type="text"
              {...register("username")}
              error={errors.username?.message}
            />
            <FormInput
              id="displayName"
              label="Display Name"
              type="text"
              {...register("displayName")}
              error={errors.displayName?.message}
            />
            <DateInput
              id="birthday"
              /* @ts-expect-error - RHF Control type mismatch after version bump, low priority */
              control={control}
              error={errors.birthday?.message}
            />
            <RadioInput
              id="gender"
              options={GENDERS}
              /* @ts-expect-error - RHF Control type mismatch after version bump, low priority */
              control={control}
              error={errors.gender?.message}
            />
            <SelectInput
              id="country"
              options={COUNTRIES}
              /* @ts-expect-error - RHF Control type mismatch after version bump, low priority */
              control={control}
              error={errors.country?.message}
            />
            <FormInput
              id="bio"
              label="About"
              type="text"
              {...register("bio")}
              error={errors.bio?.message}
            />
            <FormInput
              id="website"
              label="Website link"
              type="text"
              {...register("website")}
              error={errors.website?.message}
            />
            <FormInput
              id="facebook"
              label="Facebook Username"
              type="text"
              {...register("facebook")}
              error={errors.facebook?.message}
            />
            <FormInput
              id="x"
              label="X (Twitter) Username"
              type="text"
              {...register("x")}
              error={errors.x?.message}
            />
            <FormInput
              id="instagram"
              label="Instagram Username"
              type="text"
              {...register("instagram")}
              error={errors.instagram?.message}
            />
            <FormInput
              id="reddit"
              label="Reddit Username"
              type="text"
              {...register("reddit")}
              error={errors.reddit?.message}
            />
            <div className="flex items-center gap-2">
              <Controller
                name="showEmail"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="showEmail"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="showEmail" className="cursor-pointer">
                Show my email publicly on my profile
              </Label>
            </div>

            <ButtonsContainer>
              <Button variant="outline" asChild>
                <Link href="/dashboard/profile/">Go Back</Link>
              </Button>
              <SubmitButton text="Update user" isPending={isSubmitting} />
            </ButtonsContainer>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default EditProfile;
