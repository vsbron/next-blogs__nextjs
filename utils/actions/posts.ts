"use server";
import { cache } from "react";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "../db";
import { ARTICLES_PER_PAGE, POPULAR_POST_LIKES_COUNT } from "../constants";

// Template for Post fields to select in the database
const postFields = {
  id: true,
  title: true,
  preview: true,
  imageUrl: true,
  published: true,
  views: true,
  category: true,
  likes: { select: { id: true } },
  likesCount: true,
  commentsCount: true,
};

/* GLOBAL POSTS */
export const fetchPost = cache(async (postId: string) => {
  // Fetch the post using its ID
  const post = await db.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: { select: { displayName: true, username: true, imageUrl: true } },
      likes: { select: { id: true, userId: true, postId: true } },
    },
  });

  // Return post
  return post;
});

// Server action function that fetches all posts with filters
export const fetchAllPosts = async (
  filters: Record<string, string>,
  page: number,
) => {
  // Skip pages
  const skip = (page - 1) * ARTICLES_PER_PAGE;

  // Get the category and if popular
  const where: Prisma.PostWhereInput = {};
  if (filters.category && filters.category !== "all")
    where.category = filters.category;
  if (filters.likes) where.likesCount = { gte: Number(filters.likes) };
  if (filters.comments) where.commentsCount = { gte: Number(filters.comments) };

  // Get the order
  let orderBy: Prisma.PostOrderByWithRelationInput = { published: "desc" };
  if (filters.sort) {
    switch (filters.sort) {
      case "date_asc":
        orderBy = { published: "asc" };
        break;
      case "likes_desc":
        orderBy = { likes: { _count: "desc" } };
        break;
      case "likes_asc":
        orderBy = { likes: { _count: "asc" } };
        break;
      case "views_desc":
        orderBy = { views: "desc" };
        break;
      case "views_asc":
        orderBy = { views: "asc" };
        break;
      case "title_asc":
        orderBy = { title: "asc" };
        break;
      case "title_desc":
        orderBy = { title: "desc" };
        break;
      case "date_desc":
      default:
        orderBy = { published: "desc" };
    }
  }

  // Fetch data
  const posts = await db.post.findMany({
    where,
    orderBy,
    select: postFields,
    skip,
    take: ARTICLES_PER_PAGE,
  });

  // Total posts count
  const total = await db.post.count({ where });

  // Return posts
  return { posts, total };
};

// Server action function that fetches all posts with filters
export const fetchSearchPosts = async (
  query: string,
  filters: Record<string, string>,
  page: number,
  limit?: number,
) => {
  // Skip pages
  const skip = (page - 1) * ARTICLES_PER_PAGE;

  // Get all selected categories
  const categoryFilter = filters.category ? filters.category.split(",") : [];

  // Get the categories, title or preview that fit the query and if popular
  const where: Prisma.PostWhereInput = {};
  if (filters.category && filters.category !== "All")
    where.category = { in: categoryFilter };
  if (query) {
    const words = query.trim().split(/\s+/);

    // Each word must match either title or preview
    where.AND = words.map((word) => ({
      OR: [
        { title: { contains: word, mode: "insensitive" } },
        { preview: { contains: word, mode: "insensitive" } },
        { author: { displayName: { contains: word, mode: "insensitive" } } },
        { author: { username: { contains: word, mode: "insensitive" } } },
      ],
    }));
  }
  if (filters.likes) where.likesCount = { gte: Number(filters.likes) };
  if (filters.comments) where.commentsCount = { gte: Number(filters.comments) };

  // Get the order
  let orderBy: Prisma.PostOrderByWithRelationInput = { published: "desc" };
  if (filters.sort) {
    switch (filters.sort) {
      case "date_asc":
        orderBy = { published: "asc" };
        break;
      case "likes_desc":
        orderBy = { likes: { _count: "desc" } };
        break;
      case "likes_asc":
        orderBy = { likes: { _count: "asc" } };
        break;
      case "views_desc":
        orderBy = { views: "desc" };
        break;
      case "views_asc":
        orderBy = { views: "asc" };
        break;
      case "title_asc":
        orderBy = { title: "asc" };
        break;
      case "title_desc":
        orderBy = { title: "desc" };
        break;
      case "date_desc":
      default:
        orderBy = { published: "desc" };
    }
  }

  // Fetch data
  const posts = await db.post.findMany({
    where,
    orderBy,
    select: postFields,
    skip,
    take: limit || ARTICLES_PER_PAGE,
  });

  // Total posts count
  const total = await db.post.count({ where });

  // Return posts
  return { posts, total };
};

// Server action function that fetches all posts with filters
export const fetchTrendingPosts = async (page: number) => {
  // Skip pages
  const skip = (page - 1) * ARTICLES_PER_PAGE;

  // Get the category and if popular
  const where: Prisma.PostWhereInput = {};
  where.likesCount = { gte: POPULAR_POST_LIKES_COUNT };

  /*
  The idea here is to add a filter that fetches only posts from last 10 days,
  so it would show only recent trending posts based on likes number.
  But because it's a portfolio project with no real activity, so the list will
  quickly become empty, so I'm commenting this out

  const today = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(today.getDate() - TRENDING_POST_DATE_EXPIRY);
  where.published = { gte: tenDaysAgo, lte: today };
  */

  // Fetch data
  const posts = await db.post.findMany({
    where,
    select: postFields,
    orderBy: { published: "desc" },
    skip,
    take: ARTICLES_PER_PAGE,
  });

  // Total posts count
  const total = await db.post.count({ where });

  // Return posts
  return { posts, total };
};

// Server action function that fetches recent posts with author info and likes
export const fetchRecentPosts = async (amount: number = 12) => {
  const posts = await db.post.findMany({
    take: amount,
    orderBy: { published: "desc" },
    select: postFields,
  });

  // Return recent posts
  return posts;
};

// Server action function that fetches recent posts with author info and likes
export const fetchFeaturedPosts = async () => {
  const posts = await db.post.findMany({
    take: 8,
    orderBy: { likesCount: "desc" },
    select: postFields,
  });

  /*
  Here, same as Trending posts we need to add more logic based on a published date,
  to display the featured posts from recent period, but because we have no real
  activity, we just fetch most liked posts
  */

  // Return recent posts
  return posts;
};

/* USER-RELATED POSTS */
// Server action that fetched user's posts
export const fetchUserPosts = async (userId?: string) => {
  // If no userId provided, get it from auth()
  if (!userId) {
    const { userId: authUserId } = await auth();
    if (!authUserId) redirect("/");
    userId = authUserId;
  }

  // Search all user's liked posts
  const posts = await db.post.findMany({
    where: { authorId: userId },
    orderBy: { published: "desc" },
    select: postFields,
  });

  // Return fetched posts
  return posts;
};

// Server action function that returns user based on clerkID
export async function fetchAuthorPosts(
  userId: string,
  filters: Record<string, string>,
  page: number,
) {
  // Skip pages
  const skip = (page - 1) * ARTICLES_PER_PAGE;

  // Get the category and if popular
  const where: Prisma.PostWhereInput = {};
  if (filters.category && filters.category !== "all")
    where.category = filters.category;
  where.authorId = userId;
  if (filters.likes) where.likesCount = { gte: Number(filters.likes) };
  if (filters.comments) where.commentsCount = { gte: Number(filters.comments) };

  // Get the order
  let orderBy: Prisma.PostOrderByWithRelationInput = { published: "desc" };
  if (filters.sort) {
    switch (filters.sort) {
      case "date_asc":
        orderBy = { published: "asc" };
        break;
      case "likes_desc":
        orderBy = { likes: { _count: "desc" } };
        break;
      case "likes_asc":
        orderBy = { likes: { _count: "asc" } };
        break;
      case "views_desc":
        orderBy = { views: "desc" };
        break;
      case "views_asc":
        orderBy = { views: "asc" };
        break;
      case "title_asc":
        orderBy = { title: "asc" };
        break;
      case "title_desc":
        orderBy = { title: "desc" };
        break;
      case "date_desc":
      default:
        orderBy = { published: "desc" };
    }
  }

  // Fetch all posts from database
  const posts = await db.post.findMany({
    where,
    orderBy,
    select: postFields,
    skip,
    take: ARTICLES_PER_PAGE,
  });

  // Total posts count
  const total = await db.post.count({ where });

  // Return user
  return { posts, total };
}

// Server action function that fetches user's liked posts
export const fetchUserLikedPosts = async () => {
  // Get the current user clerkId
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Search all user's likes
  const likes = await db.like.findMany({
    where: { userId },
    orderBy: { likedTime: "desc" },
    select: { post: { select: postFields } },
  });

  // Take the posts from likes
  const posts = likes.map((like) => like.post);

  // Return liked posts
  return posts;
};

/* GENERAL STATS */
// Server action function that fetches general stats data
// export const fetchGeneralStats = async () => {
//   const [likedPosts, commentedPosts, mostPosts] = await Promise.all([
//     db.post.findMany({
//       take: 10,
//       orderBy: { likesCount: "desc" },
//       select: {
//         id: true,
//         title: true,
//         likesCount: true,
//       },
//     }),
//     db.post.findMany({
//       take: 10,
//       orderBy: { views: "desc" },
//       select: { id: true, title: true, commentsCount: true },
//     }),
//     db.user.findMany({
//       take: 10,
//       orderBy: { posts: { _count: "desc" } },
//       select: {
//         username: true,
//         displayName: true,
//         _count: { select: { posts: true } },
//       },
//     }),
//   ]);

//   return { likedPosts, commentedPosts, mostPosts };
// };

export const fetchGeneralStats = async () => {
  const [likedPosts, commentedPosts, mostPosts] = await db.$transaction([
    db.post.findMany({
      take: 10,
      orderBy: { likesCount: "desc" },
      select: {
        id: true,
        title: true,
        likesCount: true,
      },
    }),
    db.post.findMany({
      take: 10,
      orderBy: { views: "desc" },
      select: { id: true, title: true, commentsCount: true },
    }),
    db.user.findMany({
      take: 10,
      orderBy: { posts: { _count: "desc" } },
      select: {
        username: true,
        displayName: true,
        _count: { select: { posts: true } },
      },
    }),
  ]);
  return { likedPosts, commentedPosts, mostPosts };
};