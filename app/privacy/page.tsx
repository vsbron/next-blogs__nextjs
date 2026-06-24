import { Metadata } from "next";

import ArticleLayout from "@/components/ArticleLayout";
import SectionTitle from "@/components/SectionTitle";

import { MAIN_EMAIL, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    `Understand how ${SITE_NAME} collects, uses, and protects your personal information. Read our Privacy Policy for details on data handling and user rights.`,
  robots: {
    index: false,
    follow: false,
  },
};

// The page
function PrivacyPolicyPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Privacy policy</SectionTitle>
      <ArticleLayout>
        <p>
          Welcome to <strong>{SITE_NAME}</strong>. We value your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your data when you use our
          website and related services.
        </p>

        <SectionTitle as="h2">Information we collect</SectionTitle>
        <p>
          We collect information to provide and improve our services. This
          includes:
        </p>
        <ul>
          <li>
            Account information such as your name, email, and profile details
            (via Clerk authentication).
          </li>
          <li>
            Content you create or upload, such as posts, comments, and likes.
          </li>
          <li>
            Technical data like your browser type, device information, and IP
            address.
          </li>
        </ul>

        <SectionTitle as="h2">How we use your information</SectionTitle>
        <ul>
          <li>To operate and improve the {SITE_NAME} platform.</li>
          <li>To personalize your experience and display relevant content.</li>
          <li>
            To communicate with you regarding updates, features, or issues.
          </li>
          <li>
            To ensure compliance with our Terms of Use and prevent misuse.
          </li>
        </ul>

        <SectionTitle as="h2">Sharing of information</SectionTitle>
        <p>
          We do not sell your personal data. We only share information in the
          following cases:
        </p>
        <ul>
          <li>
            With our authentication provider (Clerk) for secure user management.
          </li>
          <li>
            With service providers who help us operate the platform (e.g.,
            analytics, hosting).
          </li>
          <li>
            When required by law or to protect the rights and safety of users or
            {SITE_NAME}.
          </li>
        </ul>

        <SectionTitle as="h2">Data retention</SectionTitle>
        <p>
          We retain your data as long as your account is active or as needed to
          provide our services. You can request deletion of your account and
          data at any time.
        </p>

        <SectionTitle as="h2">Security</SectionTitle>
        <p>
          We use industry-standard measures to protect your data from
          unauthorized access, disclosure, or alteration. However, no online
          service is completely secure, and you use {SITE_NAME} at your own risk.
        </p>

        <SectionTitle as="h2">Your rights</SectionTitle>
        <p>
          You can access, update, or delete your personal information anytime
          through your account settings. For any privacy-related requests,
          contact us using the details below.
        </p>

        <SectionTitle as="h2">Changes to this policy</SectionTitle>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with a new “Last updated” date.
        </p>

        <SectionTitle as="h2">Contact us</SectionTitle>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
          <br />
          <a href={`mailto:${MAIN_EMAIL}`}>{MAIN_EMAIL}</a>.
        </p>
      </ArticleLayout>
    </section>
  );
}

export default PrivacyPolicyPage;
