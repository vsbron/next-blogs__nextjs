import Link from "next/link";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import ArticleLayout from "@/components/ArticleLayout";
import Authorization from "@/components/Authorization";
import SectionTitle from "@/components/SectionTitle";

import { POST_CATEGORIES, SITE_DOMAIN, SITE_NAME } from "@/utils/constants";
import { personalAreaLinks, primaryLinks, secondaryLinks } from "@/utils/links";

// Meta data
export const metadata: Metadata = {
  title: "Sitemap",
  description:
    `Explore the full map of ${SITE_NAME} - easily navigate through articles, authors, categories, and more.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/site-map`,
  },
};

// The page
async function SitemapPage() {
  // Get is Signed in status from auth
  const { isAuthenticated } = await auth();

  // Returned JSX
  return (
    <section>
      <SectionTitle>Sitemap</SectionTitle>
      <ArticleLayout>
        <p>
          Welcome to the sitemap! Here you&apos;ll find a complete overview of
          all the sections, pages, and content available on {SITE_NAME}. Whether
          you&apos;re looking for posts, authors, categories, or special
          features, this map helps you navigate quickly and efficiently. Use it
          as a guide to explore everything we offer and find exactly what
          you&apos;re looking for.
        </p>
        <div className="grid grid-cols-3">
          <div>
            <h3>Main links</h3>
            <ul className="text-xl flex flex-col gap-2">
              {primaryLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Secondary links</h3>
            <ul className="text-xl flex flex-col gap-2">
              {secondaryLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Personal area links</h3>
            <ul
              className={`text-xl flex flex-col gap-2 ${
                !isAuthenticated && "!pl-0 items-start"
              }`}
            >
              {isAuthenticated ? (
                personalAreaLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))
              ) : (
                <Authorization />
              )}
            </ul>
          </div>
        </div>
        <h3>Post categories</h3>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-lg">
          {POST_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link href={`/posts?category=${encodeURIComponent(cat)}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </ArticleLayout>
    </section>
  );
}

export default SitemapPage;
