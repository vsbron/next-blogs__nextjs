import { countries } from "countries-list";
import { User } from "./types";

export const SITE_DOMAIN = "https://next--blogs.vercel.app";
export const SITE_NAME = "NextBlogs";
export const MAIN_EMAIL = "vsbron.webdev@gmail.com";
export const BUCKET_NAME = "post-images";
export const ARTICLES_PER_PAGE = 12;
export const USERS_PER_PAGE = 12;
export const TRENDING_POST_DATE_EXPIRY = 10;
export const POPULAR_POST_LIKES_COUNT = 5;

export const GENDERS = ["Male", "Female", "Unknown"];
export const CATEGORIES_FULL = [
  {
    name: "Art & Design",
    description:
      "Discover the world of visual arts, design, and creativity, exploring techniques, ideas, and inspiration across mediums.",
  },
  {
    name: "Books & Literature",
    description:
      "Dive into stories, poetry, and novels, with insights on authors, literary trends, and must-read classics from around the world.",
  },
  {
    name: "Business & Finance",
    description:
      "Learn about entrepreneurship, investing, and money management, exploring strategies, market trends, and financial tips.",
  },
  {
    name: "DIY & Crafts",
    description:
      "Get hands-on with creative projects, crafts, and DIY tutorials, perfect for hobbyists, makers, and anyone who loves building things.",
  },
  {
    name: "Education & Learning",
    description:
      "Explore learning techniques, study tips, and educational resources, helping learners of all ages grow and improve their skills.",
  },
  {
    name: "Fantasy",
    description:
      "Enter magical worlds of fantasy books, movies, and games, following epic stories, characters, and imaginative universes.",
  },
  {
    name: "Food & Recipes",
    description:
      "Cook, bake, and explore cuisines from around the world, with recipes, culinary tips, and delicious food inspiration for everyone.",
  },
  {
    name: "Gaming",
    description:
      "Explore video games, board games, and esports, with reviews, strategies, and news about the gaming community and culture.",
  },
  {
    name: "Health & Fitness",
    description:
      "Learn about exercise routines, nutrition, mental wellness, and healthy habits to improve your body, mind, and well-being.",
  },
  {
    name: "History",
    description:
      "Travel through time with stories, events, and biographies, exploring the fascinating past that shaped our world today.",
  },
  {
    name: "Horror",
    description:
      "Dive into scary stories, movies, and games, exploring the dark, mysterious, and thrilling corners of fiction and reality.",
  },
  {
    name: "Lifestyle",
    description:
      "Discover tips, habits, and ideas to enhance everyday life, covering hobbies, productivity, and personal growth for modern living.",
  },
  {
    name: "Movies & TV",
    description:
      "Keep up with films, series, and streaming content, with reviews, recommendations, and discussions for every entertainment lover.",
  },
  {
    name: "Music",
    description:
      "Explore all music genres, artists, and concerts, with insights on trends, albums, and the art of creating and enjoying music.",
  },
  {
    name: "Personal Stories",
    description:
      "Read or share life experiences, challenges, and triumphs, connecting people through real and inspiring stories.",
  },
  {
    name: "Pop Culture",
    description:
      "Stay updated on trends, celebrities, memes, and events shaping entertainment, fashion, and digital culture worldwide.",
  },
  {
    name: "Pro Wrestling",
    description:
      "Follow matches, events, and wrestlers in the world of professional wrestling, with highlights, stories, and fan discussions.",
  },
  {
    name: "Programming & Development",
    description:
      "Learn coding, software development, and frameworks, with tutorials, tools, and tips for developers of all levels.",
  },
  {
    name: "Science & Nature",
    description:
      "Explore discoveries, experiments, wildlife, and natural phenomena, learning about our fascinating world and universe.",
  },
  {
    name: "Sports",
    description:
      "Get the latest news, scores, and analysis from sports worldwide, following athletes, teams, and exciting competitions.",
  },
  {
    name: "Technology",
    description:
      "Discover innovations, gadgets, apps, and trends shaping the tech world, from AI to consumer electronics and software tools.",
  },
  {
    name: "Thriller",
    description:
      "Engage with suspenseful books, movies, and series, exploring stories that keep you on edge and craving the next twist.",
  },
  {
    name: "Travel",
    description:
      "Explore destinations, cultures, and adventures around the world, with travel tips, guides, and inspiring journeys for everyone.",
  },
  {
    name: "Other",
    description:
      "A category for topics that don’t fit elsewhere, covering unique, miscellaneous, and unconventional ideas and discussions.",
  },
];
export const POST_CATEGORIES = CATEGORIES_FULL.map((c) => c.name);

export const SOCIALS: { key: keyof User; prefix?: string }[] = [
  { key: "website" },
  { key: "facebook", prefix: "https://facebook.com/" },
  { key: "x", prefix: "https://twitter.com/" },
  { key: "instagram", prefix: "https://instagram.com/" },
  { key: "reddit", prefix: "https://www.reddit.com/user/" },
];

export const COUNTRIES = Object.values(countries)
  .map((c) => c.name)
  .sort()
  .concat("Unknown");

export const EMAILJS_PUBLIC_KEY = "Z6SWDyMbtxfzu4GzU";
