"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/utils/db";
import { renderError } from "@/utils/helpers";
import { validatedWithZodSchema } from "@/utils/schemaFunctions";
import { commentSchema } from "@/utils/schemas";
import { actionReturnType } from "@/utils/types";

// Template for Comment fields to select in the database
const commentFields = {
  id: true,
  post: {
    select: {
      title: true,
      imageUrl: true,
      author: { select: { displayName: true } },
      authorId: true,
    },
  },
  postId: true,
  commentText: true,
  commentedTime: true,
};

// Action function that fetches all post comments
export const fetchPostComments = async (id: number) => {
  // Fetch the comments using post id
  const comments = await db.comment.findMany({
    where: { postId: id },
    include: {
      user: true,
      post: {
        select: {
          title: true,
          imageUrl: true,
          authorId: true,
          author: {
            select: { displayName: true },
          },
        },
      },
    },
    orderBy: { commentedTime: "asc" },
  });

  // Return comments
  return comments;
};

// Action function for adding a comment
export async function addCommentAction(formData: FormData) {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/dashboard");

  try {
    // Get all the form data and validate it
    const rawData = Object.fromEntries(formData);
    const parsedData = {
      ...rawData,
      postId: Number(rawData.postId),
    };
    const validatedFields = validatedWithZodSchema(commentSchema, parsedData);

    // Update the prisma
    await Promise.all([
      db.comment.create({ data: { ...validatedFields, userId: userId } }),
      db.post.update({
        where: { id: parsedData.postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    // Return success message
    return { success: true, message: "Comment added successfully" };
  } catch (err) {
    return renderError(err, "adding a comment");
  }
}

// Action function for editing a comment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editCommentAction(commentId: number, data: any) {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/dashboard");

  // Fetch the comment to check ownership
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  // Guard clauses
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== userId)
    return { success: false, message: "Unauthorized" };

  try {
    // Parse and validate
    const parsedData = {
      ...data,
      postId: Number(data.postId),
    };
    const validatedFields = validatedWithZodSchema(commentSchema, parsedData);

    // Update the prisma
    await db.comment.update({
      where: { id: commentId },
      data: { ...validatedFields, userId },
    });

    // Return success message
    return { success: true, message: "Comment edited successfully" };
  } catch (err) {
    return renderError(err, "editing a comment");
  }
}

// Action function to delete a comment
export const deleteCommentAction = async (
  commentId: number,
  postId: number,
): actionReturnType => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch the comment to check ownership
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  // Guard clauses
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== userId)
    return { success: false, message: "Unauthorized" };

  try {
    // Delete comment from the database and update comment count
    await Promise.all([
      db.comment.delete({
        where: { id: commentId },
      }),
      db.post.update({
        where: { id: postId },
        data: { commentsCount: { decrement: 1 } },
      }),
    ]);

    // Return success message
    return { success: true, message: "Comment successfully deleted" };
  } catch (err) {
    return renderError(err, "deleting a comment");
  }
};

/* USER-RELATED COMMENTS */
// Server action that fetched user's comments
export const fetchUserComments = async (userId?: string) => {
  // If no userId provided, get it from auth()
  if (!userId) {
    const { userId: authUserId } = await auth();
    if (!authUserId) redirect("/");
    userId = authUserId;
  }

  // Search all user's comments
  const comments = await db.comment.findMany({
    where: { userId: userId },
    orderBy: { commentedTime: "desc" },
    select: commentFields,
  });

  // Return fetched comments
  return comments;
};
