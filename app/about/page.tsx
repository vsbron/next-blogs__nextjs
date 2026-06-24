import { Metadata } from "next";

import ArticleLayout from "@/components/ArticleLayout";
import SectionTitle from "@/components/SectionTitle";

import { SITE_DOMAIN, SITE_NAME } from "@/utils/constants";

// Meta data
export const metadata: Metadata = {
  title: "About Us",
  description:
    `Discover the story behind ${SITE_NAME}, our mission, and the vision driving our modern blogging platform.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/about`,
  },
};
// The page
function AboutPage() {
  // Returned JSX
  return (
    <section>
      <SectionTitle>About Us</SectionTitle>
      <ArticleLayout>
        <p>
          Welcome to <strong>Next Blogs</strong> - a fully functional blogging
          platform built as a personal portfolio project.
        </p>
        <p>
          While the primary goal of this project is to showcase modern web
          development skills, it is not a mockup or a demo. Users can register,
          create posts, edit content, like and share articles, and interact with
          the platform as they would on a real-world application.
        </p>
        <SectionTitle as="h2">Project Purpose</SectionTitle>
        <p>
          Next Blogs was created as a <strong>portfolio project</strong>, but
          with the mindset of building a real product rather than a simplified
          example.
        </p>
        <p>
          Instead of common practice projects like small utilities or
          application clones, this platform focuses on realistic features,
          scalable structure, and long-term maintainability. Using a familiar
          concept like blogging allows the attention to stay on architecture,
          data flow, and user experience rather than artificial constraints.
        </p>
        <p>
          The project has been developed iteratively, with continuous
          refinement, refactoring, and feature expansion as part of the learning
          process.
        </p>
        <SectionTitle as="h2">Features &amp; Functionality</SectionTitle>
        <ul>
          <li>User authentication and profile management</li>
          <li>Creating, editing, and deleting posts</li>
          <li>Image uploads and content formatting</li>
          <li>Likes, sharing, and basic engagement tracking</li>
          <li>Search with filters and live previews</li>
        </ul>
        <SectionTitle as="h2">Technology &amp; Approach</SectionTitle>
        <p>
          The platform is built using modern web technologies with an emphasis
          on clean architecture, performance, and reliability.
        </p>
        <p>
          Design and implementation focus on responsive layouts, accessibility,
          and predictable user interactions across devices.
        </p>
        <SectionTitle as="h2">Usage &amp; Disclaimer</SectionTitle>
        <p>
          Next Blogs is not intended for commercial use. It exists as a learning
          project and a technical showcase.
        </p>
        <p>
          Any images, names, or references belong to their respective owners.
          Some content may be generated or assisted by AI and should not be
          considered authoritative.
        </p>
        <SectionTitle as="h3">Final Notes</SectionTitle>
        <p>
          Although this project serves as a portfolio piece, it is actively
          usable and reflects real-world development patterns rather than
          theoretical examples.
        </p>
        <p>
          Thanks for taking the time to explore <strong>Next Blogs</strong>.
        </p>
      </ArticleLayout>
    </section>
  );
}
export default AboutPage;
