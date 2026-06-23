"use client";
import { useUser } from "@clerk/nextjs";

import SectionTitle from "@/components/SectionTitle";
import AddCommentForm from "@/components/Comments/AddCommentForm";
import AuthToComment from "@/components/Comments/AuthToComment";
import PostComment from "@/components/Comments/PostComment";
import SkeletonComments from "@/components/skeletons/SkeletonComments";

import useGetComments from "@/hooks/useGetComments";
import { useState } from "react";
import { SortDesc } from "lucide-react";

// Props type
type PostCommentsProps = { postId: number };

// The component
function PostComments({ postId }: PostCommentsProps) {
  // Get the isSignedIn status of current user and user object
  const { isSignedIn, user } = useUser();

  // Get the comments for posts
  const { comments, isLoading } = useGetComments(postId);

  // Create state value for sorting order
  const [isSortedReverse, setIsSortedReverse] = useState<boolean>(false);

  // Guard clauses
  if (isLoading)
    return (
      <>
        <SectionTitle as="h3">Comments</SectionTitle>
        <SkeletonComments />
      </>
    );
  if (!comments)
    return (
      <div>
        Sorry! There was an error while loading the comments.
        <br />
        Please try again...
      </div>
    );

  // Prepare comments list in desired order
  const sortedComments = isSortedReverse ? [...comments].reverse() : comments;

  // Returned JSX
  return (
    <section className="mt-6">
      <div className="flex justify-between items-center">
        <SectionTitle as="h3" className="max-xs:!text-[20px]">
          Comments ({comments.length})
        </SectionTitle>

        {/* Sort button */}
        <div
          className="cursor-pointer text-foreground/60 mt-2.5 xs:mt-4"
          onClick={() => setIsSortedReverse((iSR) => !iSR)}
        >
          <span className="flex gap-1 text-sm">
            {isSortedReverse ? "Newest" : "Oldest"}
            <SortDesc className="w-5 h-5 relative top-0.5" />
          </span>
        </div>
      </div>

      {/* New comment form */}
      {isSignedIn ? <AddCommentForm postId={postId} /> : <AuthToComment />}

      {/* Existing comments */}
      {comments.length > 0 ? (
        <div className="flex flex-col gap-4 max-md:mb-20">
          {sortedComments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              currentUserId={user?.id}
            />
          ))}
        </div>
      ) : (
        <p>No comments yet for this post</p>
      )}
    </section>
  );
}

export default PostComments;
