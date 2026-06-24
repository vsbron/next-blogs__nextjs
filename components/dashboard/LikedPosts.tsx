import Link from "next/link";

import ArticleLayout from "@/components/ArticleLayout";
import PostPreviewTile from "@/components/PostPreview/PostPreviewTile";
import PostsGridLayout from "@/components/PostPreview/PostsGridLayout";

import { fetchUserLikedPosts } from "@/utils/actions/posts";
import { SITE_NAME } from "@/utils/constants";

async function LikePosts() {
  // Fetch user's posts
  const posts = await fetchUserLikedPosts();

  // Guard clause
  if (!posts || !posts.length)
    return (
      <ArticleLayout>
        <h3 className="mb-2">No liked posts yet</h3>
        <p>
          Looks like you have not liked any posts yet.
          <br />
          Browse through <Link href="/posts/">all posts</Link> on {SITE_NAME} and
          find something you enjoy.
        </p>
      </ArticleLayout>
    );

  // Returned JSX
  return (
    <PostsGridLayout>
      {posts.map((post) => {
        return <PostPreviewTile key={post.id} post={post} />;
      })}
    </PostsGridLayout>
  );
}

export default LikePosts;
