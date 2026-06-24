import Link from "next/link";

import { SITE_NAME } from "@/utils/constants";

function LegalInfo() {
  // Returned JSX
  return (
    <div>
      <h4 className="text-lg mb-1">Legal Info</h4>
      <p className="text-sm">
        All posts are created by individual users. {SITE_NAME} is not responsible
        for their content.
        <br />
        Redistribution or copying without permission is prohibited.
        <span className="flex gap-3 mt-0.5">
          <Link
            href="/terms"
            className="text-foreground/50 hover:text-foreground"
          >
            Terms of use
          </Link>
          <Link
            href="/privacy"
            className="text-foreground/50 hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </span>
      </p>
    </div>
  );
}

export default LegalInfo;
