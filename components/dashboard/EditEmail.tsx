import { FormEvent, useState } from "react";
import { EmailAddressResource } from "@clerk/types";
import { useReverification, type useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";

// Props type
type ClerkUser = ReturnType<typeof useUser>["user"];

// The component
function EditEmail({ user }: { user: ClerkUser }) {
  // Set state for isLoading, error, adding an email and setters
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [addEmailLine, setAddEmailLine] = useState<boolean>(false);
  const openEmailLine = () => setAddEmailLine(true);
  const closeEmailLine = () => setAddEmailLine(false);

  // Verification functions
  const addNewEmail = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );
  // const setPrimaryMail = useReverification(async (emailId: string) => {
  //   await user?.update({ primaryEmailAddressId: emailId });
  // });
  const removeEmail = useReverification(async (emailId: string) => {
    // Find the email in user's addresses (if exists) and delete it
    const emailObj = user?.emailAddresses.find((e) => e.id === emailId);
    if (!emailObj) return;
    await emailObj.destroy();
  });

  // Add email handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Enable loading state
    setIsLoading(true);

    // Get the form data and the email
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // Add email, display message and reset error
      await addNewEmail(email);
      closeEmailLine();
      setErrorMessage("");
      toast("Check your inbox to verify");
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "There was some error while adding an email",
      );
    } finally {
      // Disable loading state
      setIsLoading(false);
    }
  };
  const handlePrimaryEmail = async (id: string) => {
    // Changing primary mail - not working in dev mode
    // try {
    //   await setPrimaryMail(id);
    //   toast("Email set as primary");
    // /* ALSO NEED TO UPDATE EMAIL IN PRISMA*/
    // } catch (err) {
    //   setErrorMessage(
    //     err instanceof Error ? err.message : "There was some error"
    //   );
    // }
    console.log(id);
    toast("Setting primary email not available in dev mode");
  };
  // Remove email handler
  const handleDelete = async (id: string) => {
    // Enable loading state
    setIsLoading(true);

    try {
      // Remove email, display message
      await removeEmail(id);
      toast("Email removed");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "There was some error",
      );
    } finally {
      // Disable loading state
      setIsLoading(false);
    }
  };

  // Returned JSX
  return (
    <div>
      <h3 className="mb-1">Current emails:</h3>
      <div className="flex flex-col-reverse gap-0.5 mb-3">
        {user?.emailAddresses.map((email) => (
          <EmailLine
            key={email.emailAddress}
            email={email}
            deleteHandler={() => handleDelete(email.id)}
            setPrimaryEmail={() => handlePrimaryEmail(email.id)}
            isPrimary={email.id === user.primaryEmailAddressId}
          />
        ))}
      </div>
      {addEmailLine ? (
        <AddEmailForm
          handleSubmit={handleSubmit}
          error={error}
          close={closeEmailLine}
          isDisabled={isLoading}
        />
      ) : (
        <Button size="xs" onClick={openEmailLine}>
          Add email
        </Button>
      )}
    </div>
  );
}

// Helper components
function EmailLine({
  email,
  setPrimaryEmail,
  deleteHandler,
  isPrimary,
}: {
  email: EmailAddressResource;
  setPrimaryEmail: () => Promise<void>;
  deleteHandler: () => Promise<void>;
  isPrimary: boolean;
}) {
  // Returned JSX
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        isPrimary && "font-bold"
      }`}
    >
      <span className="truncate">{email.emailAddress}</span>
      {!isPrimary ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="xs"
            className="text-xs hidden xs:block"
            onClick={setPrimaryEmail}
          >
            Set as primary
          </Button>
          <Button
            variant="destructive"
            size="xs"
            className="text-xs"
            onClick={deleteHandler}
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <span className="text-sm font-normal hidden xs:inline">(Primary)</span>
      )}
    </div>
  );
}

function AddEmailForm({
  handleSubmit,
  error,
  close,
  isDisabled,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  error: string | null;
  close: () => void;
  isDisabled: boolean;
}) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-4"
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="xs:max-w-50"
        />
        <div className="flex gap-2">
          <Button size="xs" type="submit" disabled={isDisabled}>
            {isDisabled ? "Updating..." : "Add"}
          </Button>
          <Button variant="outline" size="xs" onClick={close}>
            Cancel
          </Button>
        </div>
      </form>
      <span className="text-destructive text-sm">{error}</span>
    </>
  );
}

export default EditEmail;
