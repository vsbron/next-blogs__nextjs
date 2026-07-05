import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReverification, type useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import FormGroup from "@/components/form/FormGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserAvatar } from "@/utils/actions/users";

// Props type
type ClerkUser = ReturnType<typeof useUser>["user"];

// The component
function EditAvatar({ user }: { user: ClerkUser }) {
  // Set state variables for error & isLoading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get the router
  const router = useRouter();

  // Verification function
  const setAvatar = useReverification((file: File) =>
    user?.setProfileImage({ file }),
  );

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Enable loading state
    setIsLoading(true);

    // Get the form data and the file
    const formData = new FormData(e.currentTarget);
    const file = formData.get("avatar") as File;

    try {
      // Set new avatar
      const newAvatar = await setAvatar(file);

      // Guard clause
      if (!newAvatar) throw new Error("Could not update avatar");

      // Update image in the prisma
      await updateUserAvatar(newAvatar.publicUrl!);

      // Display the message and redirect
      toast("Avatar successfully updated");
      router.push("/dashboard/profile");
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "There was some error while updating the avatar",
      );
    } finally {
      // Disable loading state
      setIsLoading(false);
    }
  };

  // Returned JSX
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
        <FormGroup>
          <Label htmlFor="avatar" className="capitalize">
            Add new avatar (1:1)
          </Label>
          <Input
            id="avatar"
            name="avatar"
            type="file"
            className="xs:max-w-50"
          />
        </FormGroup>
        <Button size="xs" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Save avatar"}
        </Button>
      </form>
      <span className="text-destructive text-sm">{errorMessage}</span>
    </>
  );
}

export default EditAvatar;
