import { Metadata } from "next";

import ArticleLayout from "@/components/ArticleLayout";
import SectionTitle from "@/components/SectionTitle";
import ContactUsForm from "@/components/ContactUsForm";

import { SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    `Get in touch with the ${SITE_NAME} team for questions, feedback, or collaboration opportunities.`,
  robots: {
    index: false,
    follow: false,
  },
};

// The page
function ContactPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>Contact Us</SectionTitle>
      <ArticleLayout>
        <p>
          We would love to hear from you. Whether you have feedback, questions,
          ideas, or just want to share your thoughts about the project - feel
          free to reach out.
        </p>
        <p>
          {SITE_NAME} is a fully functional platform, and input from real users
          helps shape future improvements, refinements, and experiments.
        </p>
        <p>
          Use the contact form below to get in touch, and we will respond as
          soon as possible.
        </p>
        <p>
          Thanks for your time, interest, and support - it is genuinely
          appreciated.
        </p>
        <ContactUsForm />
      </ArticleLayout>
    </section>
  );
}

export default ContactPage;
