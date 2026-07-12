"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import SectionSeparator from "@/components/SectionSeparator";
import EditEmail from "@/components/dashboard/EditEmail";
import EditPassword from "@/components/dashboard/EditPassword";
import EditAvatar from "@/components/dashboard/EditAvatar";
import { ButtonsContainer } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// The component
function EditCredentials() {
  // Get current user data
  const { user, isLoaded } = useUser();

  // Guard clauses
  if (isLoaded && !user) {
    redirect("/");
  }
  if (!isLoaded) {
    return <Skeleton className="max-w-112.5 h-40 md:h-100" />;
  }

  // Returned JSX
  return (
    <section>
      <Card className="max-w-112.5">
        <CardContent>
          <EditEmail user={user} />
          <SectionSeparator />
          <EditPassword user={user} />
          <SectionSeparator />
          <EditAvatar user={user} />
          <ButtonsContainer>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile/">Go Back</Link>
            </Button>
          </ButtonsContainer>
        </CardContent>
      </Card>
    </section>
  );
}

export default EditCredentials;
