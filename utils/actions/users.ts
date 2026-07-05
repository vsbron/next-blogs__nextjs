"use server";
import { cache } from "react";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import db from "../db";
import { userSchema } from "../schemas";
import { validatedWithZodSchema } from "../schemaFunctions";
import { renderError } from "../helpers";
import { PostPreview } from "../types";
import { USERS_PER_PAGE } from "../constants";

const postFields = {
  id: true,
  title: true,
  preview: true,
  imageUrl: true,
  published: true,
  views: true,
  category: true,
  likesCount: true,
  commentsCount: true,
};

// Server action function that returns user based on clerkID
export async function fetchCurrentUser() {
  // Get current user ID
  const { userId } = await auth();

  // Guard clause
  if (!userId) return null;

  // Fetch the user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: {
      clerkId: true,
      imageUrl: true,
      username: true,
      displayName: true,
      email: true,
      dateCreated: true,
      birthday: true,
      gender: true,
      country: true,
      bio: true,
      website: true,
      facebook: true,
      x: true,
      instagram: true,
      reddit: true,
    },
  });

  // Return user
  return user;
}

// Server action function that returns user based on clerkID
export async function fetchAllUsers(
  filters: Record<string, string>,
  page: number,
) {
  // Skip pages
  const skip = (page - 1) * USERS_PER_PAGE;

  // Get the country, gender and if popular
  const where: Prisma.UserWhereInput = {};
  if (filters.country && filters.gender !== "all")
    where.country = filters.country;
  if (filters.gender && filters.gender !== "all") where.gender = filters.gender;
  // if (filters.popular) where.views = { gte: 100 };

  // Get the order
  let orderBy: Prisma.UserOrderByWithRelationInput = { dateCreated: "desc" };
  if (filters.sort) {
    switch (filters.sort) {
      case "name_asc":
        orderBy = { displayName: "asc" };
        break;
      case "name_desc":
        orderBy = { displayName: "desc" };
        break;
      case "username_asc":
        orderBy = { username: "asc" };
        break;
      case "username_desc":
        orderBy = { username: "desc" };
        break;
      case "date_asc":
        orderBy = { dateCreated: "asc" };
        break;
      case "posts_desc":
        orderBy = { posts: { _count: "desc" } };
        break;
      case "posts_asc":
        orderBy = { posts: { _count: "asc" } };
        break;
      case "date_desc":
      default:
        orderBy = { dateCreated: "desc" };
    }
  }

  // Fetch all users from database
  const users = await db.user.findMany({
    where,
    orderBy,
    select: {
      imageUrl: true,
      username: true,
      displayName: true,
      country: true,
      dateCreated: true,
      _count: { select: { posts: true } },
    },
    skip,
    take: USERS_PER_PAGE,
  });

  // Total users count
  const total = await db.user.count({ where });

  // Return user
  return { users, total };
}

// Action function for updating the user
export async function updateUserAction(formData: FormData) {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");
  try {
    // Get all the form data and validate it
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(userSchema, rawData);

    // Update the prisma
    await db.user.update({
      where: { clerkId: userId },
      data: validatedFields,
    });

    // Revalidate path
    revalidatePath("/dashboard/profile");

    // Return success message
    return { success: true, message: "User updated successfully" };
  } catch (err) {
    return renderError(err, "updating the user");
  }
}

// Fetch user by his username
export const fetchUser = cache(async (username: string) => {
  // Fetch the user using its username
  const user = await db.user.findUnique({
    where: { username: username },
  });

  // Return user
  return user;
});

// Fetch user by his username
export const fetchUserWithID = cache(async (userId: string) => {
  // Fetch the user using its ID
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  // Return user
  return user;
});

// User's stats action function type
export type UserStats = {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
};
// Server action function that collects user's stats
export async function fetchUserStats(
  userId?: string,
): Promise<UserStats | null> {
  // Get current user ID if not provided
  if (!userId) {
    const { userId: authUserId } = await auth();
    if (!authUserId) return null;
    userId = authUserId;
  }

  // Aggregate counts: posts, total views, comments, likes
  const postsAggregate = await db.post.aggregate({
    where: { authorId: userId },
    _count: { id: true },
    _sum: { views: true, commentsCount: true, likesCount: true },
  });

  // Return total posts, views and most viewed post
  return {
    totalPosts: postsAggregate._count.id,
    totalViews: postsAggregate._sum.views || 0,
    totalLikes: postsAggregate._sum.likesCount || 0,
    totalComments: postsAggregate._sum.commentsCount || 0,
  };
}

// User's top posts action function type
export type UserTopPosts = {
  topPosts: (PostPreview | null)[];
};

// Server action function that collects user's top posts
export async function fetchUserTopsPosts(
  userId?: string,
): Promise<UserTopPosts> {
  // Get current user ID if not provided
  if (!userId) {
    const { userId: authUserId } = await auth();
    if (authUserId) {
      userId = authUserId;
    }
  }

  const topPosts = await Promise.all([
    db.post.findFirst({
      where: { authorId: userId },
      orderBy: { likesCount: "desc" },
      select: postFields,
    }),
    db.post.findFirst({
      where: { authorId: userId },
      orderBy: { views: "desc" },
      select: postFields,
    }),
    db.post.findFirst({
      where: { authorId: userId },
      orderBy: { commentsCount: "desc" },
      select: postFields,
    }),
  ]);

  // Return total posts
  return { topPosts };
}

// Small server action function for avatar update in DB
export async function updateUserAvatar(imageUrl: string): Promise<void> {
  // Get the current user clerkId
  const { userId } = await auth();

  // Guard clause
  if (!userId) throw new Error("Not authenticated");

  // Update the avatar
  try {
    await db.user.update({
      where: { clerkId: userId },
      data: { imageUrl: imageUrl },
    });
  } catch (err) {
    console.log(err);
    throw new Error("There was some error while updating the avatar");
  }
}
