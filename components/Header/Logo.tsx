import Link from "next/link";

import { SITE_NAME } from "@/utils/constants";

function Logo() {
  // Returned JSX
  return (
    <Link href="/">
      <svg className="fill-primary relative top-0.5 hover:fill-primary-light transition-all dark:fill-foreground dark:hover:fill-muted-foreground w-30.5 h-7.5 sm:w-35.5 sm:h-8.75">
        <title>{SITE_NAME}</title>
        <use href="/logo.svg#logo"></use>
      </svg>
    </Link>
  );
}

export default Logo;
