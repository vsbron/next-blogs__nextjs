import Link from "next/link";
import { Metadata } from "next";

import ArticleLayout from "@/components/ArticleLayout";
import SectionTitle from "@/components/SectionTitle";

import { MAIN_EMAIL, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    `Review the Terms of Use for ${SITE_NAME}. Learn about your rights, responsibilities, and the conditions for using our website and services.`,
  robots: {
    index: false,
    follow: false,
  },
};

// The page
function TermsOfUsePage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Terms of use</SectionTitle>
      <ArticleLayout>
        <p>
          Welcome to <strong>{SITE_NAME}</strong> (&quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;). By accessing or using {SITE_NAME}
          you agree to be bound by these Terms of Use. If you do not agree,
          please do not use the platform.
        </p>

        <SectionTitle as="h2">Eligibility</SectionTitle>
        <p>
          You must be at least 13 years old to use {SITE_NAME}. By registering,
          you represent and warrant that the information you provide is accurate
          and complete.
        </p>

        <SectionTitle as="h2">User accounts</SectionTitle>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity that occurs under your
          account. Notify us immediately of any unauthorized use or security
          breach.
        </p>

        <SectionTitle as="h2">User content</SectionTitle>
        <p>
          You retain ownership of the content you create and publish on
          {SITE_NAME}. By posting content on the platform you grant {SITE_NAME} a
          non-exclusive, royalty-free, worldwide license to host, display,
          reproduce, and distribute that content within the service for the
          purpose of operating and promoting the platform.
        </p>
        <p>
          You agree not to publish content that is unlawful, defamatory,
          pornographic, hateful, harassing, or otherwise violates applicable law
          or third-party rights (including intellectual property rights).
        </p>

        <SectionTitle as="h2">Acceptable use</SectionTitle>
        <p>You must not:</p>
        <ul>
          <li>
            Use the platform for spam, phishing, or unsolicited commercial
            messages;
          </li>
          <li>Interfere with or disrupt the service, servers, or networks;</li>
          <li>
            Attempt to reverse-engineer, copy, or resell the platform or its
            components;
          </li>
          <li>
            Impersonate another person or misrepresent your affiliation with any
            person or organization.
          </li>
        </ul>

        <SectionTitle as="h2">Moderation and removal</SectionTitle>
        <p>
          We reserve the right, but are not obligated, to remove or restrict
          access to content that violates these Terms or is otherwise
          objectionable. We may suspend or terminate accounts at our discretion
          for violations.
        </p>

        <SectionTitle as="h2">Privacy</SectionTitle>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains how we
          collect, use, and share personal information. By using {SITE_NAME} you
          consent to that collection and processing.
        </p>

        <SectionTitle as="h2">Third-party services</SectionTitle>
        <p>
          {SITE_NAME} may integrate with third-party services (e.g.,
          authentication, analytics, hosting). Those services are governed by
          their own terms and privacy policies; we are not responsible for their
          practices.
        </p>

        <SectionTitle as="h2">Disclaimers</SectionTitle>
        <p className="uppercase">
          {SITE_NAME} IS PROVIDED <em>AS IS</em> AND <em>AS AVAILABLE</em> WITHOUT
          WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE
          SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. USER-GENERATED
          CONTENT IS THE RESPONSIBILITY OF THE POSTING USER; WE DO NOT ENDORSE
          OR VERIFY IT.
        </p>

        <SectionTitle as="h2">Limitation of liability</SectionTitle>
        <p className="uppercase">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL {SITE_NAME},
          ITS AFFILIATES, OR CONTRIBUTORS BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE
          OF THE SERVICE.
        </p>

        <SectionTitle as="h2">Changes to these terms</SectionTitle>
        <p>
          We may update these Terms from time to time. We will post the updated
          Terms with a new &quot;Last updated&quot; date. Continued use of the
          service after changes constitutes acceptance of the revised Terms.
        </p>

        <SectionTitle as="h2">Governing law</SectionTitle>
        <p>
          These Terms are governed by the laws of the applicable jurisdiction
          where {SITE_NAME} operates, without regard to conflict-of-law
          principles.
        </p>

        <SectionTitle as="h3">Contact us</SectionTitle>
        <p>
          For questions about these Terms, contact us at{" "}
          <a href={`mailto:${MAIN_EMAIL}`}>{MAIN_EMAIL}</a>.
        </p>
      </ArticleLayout>
    </section>
  );
}

export default TermsOfUsePage;
