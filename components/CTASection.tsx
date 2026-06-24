import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Authorization from "@/components/Authorization";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";

import CTAImg from "@/assets/ctaImg.png";
import { PencilLine } from "lucide-react";
import { SITE_NAME } from "@/utils/constants";

function CTASection({ index = false }: { index?: boolean }) {
  // Returned JSX
  return (
    <section
      className={`py-8 xs:py-18 sm:py-20 md:py-24 relative ${
        index ? "my-6 lg:my-12" : "my-6"
      }`}
    >
      <SectionTitle as={index ? "h1" : "div"} className="pr-10">
        Read, Create and Share your stories on{" "}
        <span className="text-primary font-semibold lowercase">{SITE_NAME}</span>
      </SectionTitle>
      <div className="max-w-3xl pr-10 xs:pr-36 md:pr-20">
        <p className="text-xl sm:text-2xl">
          Join our community of writers and readers. Discover trending posts,
          follow your favorite authors, and share your own thoughts with the
          world.
        </p>
        <div className="border-b border-border/50 w-full mt-5 mb-4"></div>
        <SignedIn>
          <p className="text-lg sm:text-xl mb-4 pr-20">
            Create a new post and share your story with the community!
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard/add-post">
              <PencilLine />
              <span className="text-lg">Post</span>
            </Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <p className="text-lg sm:text-xl mb-4">
            Sign up or log in to start sharing your stories today!
          </p>
          <div className="flex gap-2 sm:gap-4">
            <Authorization className="text-lg" size="lg" />
          </div>
        </SignedOut>
      </div>
      <CTABackground />
    </section>
  );
}

// Helper component
function CTABackground() {
  // Returned JSX
  return (
    <div className="absolute h-full -right-5 xs:right-0 inset-0 left-1/3 overflow-hidden -z-10">
      <Image
        src={CTAImg}
        alt={SITE_NAME}
        fill
        className="object-cover xs:rounded-xl"
        sizes="(max-width: 1200px) 90vw, 50vw"
        priority
      />
      <div className="absolute inset-0 right-0 bg-gradient-to-r from-background/100 via-background/100 via-[20%] to-background/70 xs:to-background/0" />
    </div>
  );
}

export default CTASection;
