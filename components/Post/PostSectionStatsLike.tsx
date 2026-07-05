"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { togglePostLike } from "@/utils/actions/post";
import { Like } from "@/utils/types";

import { ThumbsUp } from "lucide-react";

// Props type
type PostSectionStatsLikeProps = {
  likes: Like[];
  postId: number;
};

// The component
function PostSectionStatsLike({ likes, postId }: PostSectionStatsLikeProps) {
  // Get the current user id and signIn function from clerk
  const { user } = useUser();
  const currentUserId = user?.id;
  const { openSignIn } = useClerk();

  // Create state value for liked post and likes count
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);

  // Use Effect function that updates the likes counter
  useEffect(() => {
    if (currentUserId) {
      setIsLiked(!!likes.find((like: Like) => like.userId === currentUserId));
    }
  }, [likes, currentUserId]);

  // Like post handler function
  const likePostHandler = async () => {
    // Guard clause
    if (!currentUserId) return openSignIn();

    // Change the liked post value
    const result = await togglePostLike(postId);
    setIsLiked(result.liked);

    // Update the likes count and trigger toast
    setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
    toast(`Post ${result.liked ? "added to" : "removed from"} Favorites`);
  };
  // Returned JSX
  return (
    <>
      <ThumbsUp
        className={cn(
          "post-stats-icon cursor-pointer transition-colors duration-200",
          isLiked && "fill-primary",
        )}
        onClick={likePostHandler}
      />
      {likeCount}
    </>
  );
}

export default PostSectionStatsLike;
