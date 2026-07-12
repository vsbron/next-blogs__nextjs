import { useState } from "react";
import { useReverification, type useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import FormGroup from "@/components/form/FormGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props type
type ClerkUser = ReturnType<typeof useUser>["user"];

// The component
function EditPassword({ user }: { user: ClerkUser }) {
  // Set state variables for isLoading & error
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Verification function
  const setPassword = useReverification(
    (password: string, newPassword: string) =>
      user?.updatePassword({
        currentPassword: password,
        newPassword: newPassword,
      }),
  );

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Enable loading state
    setIsLoading(true);

    // Get the form
    const form = e.currentTarget as HTMLFormElement;

    // Get the form data and the passwords
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Guard clause
    if (newPassword !== confirmPassword) {
      setErrorMessage("Your new passwords do not match");
      return;
    }
    try {
      // Update/set password
      await setPassword(password, newPassword);

      // Display the message, reset the error and form
      toast("Password successfully updated");
      setErrorMessage("");
      form.reset();
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "There was some error while updating a password",
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
        {user?.passwordEnabled && (
          <FormGroup>
            <Label htmlFor="password" className="capitalize">
              Current password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter current password"
              className="xs:max-w-50"
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="newPassword" className="capitalize">
            New password
          </Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            className="xs:max-w-50"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword" className="capitalize">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="xs:max-w-50"
          />
        </FormGroup>
        <Button size="xs" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Save password"}
        </Button>
      </form>
      <span className="text-destructive text-sm">{errorMessage}</span>
    </>
  );
}

export default EditPassword;
