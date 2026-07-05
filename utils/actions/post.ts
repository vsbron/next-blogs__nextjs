"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "../db";
import { BUCKET_NAME } from "../constants";
import { renderError } from "../helpers";
import { actionReturnType } from "../types";
import { imageSchema, postSchema } from "../schemas";
import { validatedWithZodSchema } from "../schemaFunctions";
import { supabase, uploadImage } from "../supabase";

// Action function to create a new post
export const createEditPostAction = async (
  formData: FormData,
): actionReturnType => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  try {
    // Get all the form data and validate it
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(postSchema, rawData);

    // Get the image from formData
    const file = formData.get("imageUrl") as File;

    // Validate the image file
    const validatedImage = validatedWithZodSchema(imageSchema, {
      imageUrl: file,
    });

    // Upload the image and get the full path
    const fullPath = await uploadImage(validatedImage!.imageUrl!);

    // Create post in the database
    await db.post.create({
      data: {
        ...validatedFields,
        imageUrl: fullPath,
        authorId: userId,
      },
    });

    // Return success message
    return { success: true, message: "Post successfully created" };
  } catch (err) {
    return renderError(err, "creating a post");
  }
};

// Action function to edit a post
export const editPostAction = async (
  formData: FormData,
  postId: number,
): actionReturnType => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch the post to check ownership
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true, imageUrl: true },
  });

  // Guard clauses
  if (!post) return { success: false, message: "Post not found" };
  if (post.authorId !== userId)
    return { success: false, message: "Unauthorized" };

  try {
    // Get all the form data and validate it
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(postSchema, rawData);

    // IMAGE REPLACE
    // Get the image from formData
    const file = formData.get("imageUrl") as File | null; // file can be null
    let fullPath: string | undefined;

    if (file && file.size > 0) {
      // Decode URL to get the correct file path
      const decodedPath = decodeURIComponent(post.imageUrl);
      const fileName = decodedPath.split("/post-images/")[1];

      // Remove existing image from the bucket
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

      // If fail, log error
      if (error)
        return { success: false, message: "Failed to delete existing image" };

      // Validate the image file
      const validatedImage = validatedWithZodSchema(imageSchema, {
        imageUrl: file,
      });

      // Upload the image and get the full path
      fullPath = await uploadImage(validatedImage!.imageUrl!);
    }

    // Create post in the database
    await db.post.update({
      where: { id: postId },
      data: {
        ...validatedFields,
        ...(fullPath ? { imageUrl: fullPath } : {}),
      },
    });

    // Return success message
    return { success: true, message: "Post successfully updated" };
  } catch (err) {
    return renderError(err, "editing a post");
  }
};

// Action function to delete a post
export const deletePostAction = async (postId: number): actionReturnType => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch the post to check ownership
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true, imageUrl: true },
  });

  // Guard clauses
  if (!post) return { success: false, message: "Post not found" };
  if (post.authorId !== userId)
    return { success: false, message: "Unauthorized" };

  try {
    // Delete post from the database
    await db.post.delete({
      where: { id: postId },
    });

    // IMAGE DELETE
    // Decode URL to get the correct file path
    const decodedPath = decodeURIComponent(post.imageUrl);
    const fileName = decodedPath.split("/post-images/")[1];

    // Remove existing image from the bucket
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    // If fail, log error
    if (error)
      return { success: false, message: "Failed to delete existing image" };

    // Return success message
    return { success: true, message: "Post successfully deleted" };
  } catch (err) {
    return renderError(err, "deleting a post");
  }
};

// Action function that increases the views count
export const incrementPostView = async (id: number) => {
  // Create post in the database
  await db.post.update({
    where: { id: id },
    data: {
      views: { increment: 1 },
    },
  });
};

// Action function that increases the likes count
export const togglePostLike = async (postId: number) => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Check if post was already liked
  const existing = await db.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    // Delete like and decrement likesCount
    await Promise.all([
      db.like.delete({ where: { userId_postId: { userId, postId } } }),
      db.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } },
      }),
    ]);
    return { liked: false };
  } else {
    // Create like and increment likesCount
    await Promise.all([
      db.like.create({ data: { userId, postId } }),
      db.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } },
      }),
    ]);
    return { liked: true };
  }
};
