# NextBlogs

NextBlogs is a multi-user blogging platform built with **Next.js**, **Clerk**, **Prisma**, and **Supabase**.  
It offers a clean, responsive environment for reading, writing, and discovering content, with full authentication, profiles, and post management tools.  
The platform focuses on clarity, modular design, and a smooth reading and writing experience.

---

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Page Descriptions](#page-descriptions)
   - [Home Page](#home-page)
   - [Post Page](#post-page)
   - [Author Page](#author-page)
   - [Search Page](#search-page)
   - [Dashboard](#dashboard)
   - [Additional Pages](#additional-pages)
4. [Technical Details](#technical-details)
5. [Live Version](#live-version)

---

## Project Core principles

- Simple and clean interface
- Reusable, modular components
- Secure authentication
- Clear separation between public routes and dashboard features

---

### UI / UX Features

- 🏠 **Home Page** with featured posts, recent posts, stats, and CTA
- 🔥 **Trending Posts** page based on recent activity
- 🗂️ **Full Post Filtering & Pagination** (category, popularity, views, date)
- ❤️ **Like and Share Buttons** for posts with real-time updates
- 🧑‍🤝‍🧑 **Author List Page** with filters & pagination
- 🔍 **Global Search Bar** available on any page, with live result previews
- 🌙 **Light/Dark Theme Toggle**
- 📱 **Fully Responsive Layout**
- 💬 **Comments System**
  - Authorized users can add comments to posts
  - Comments are displayed directly on the post page and can be sorted by date
  - Users can edit or delete their own comments from the post page
  - All user comments are also accessible and editable from the dashboard

### Backend / Logic Features

- 👤 **User Authentication** via Clerk (accounts stored in Prisma/Supabase and linked by `clerkId`)
- 📊 **Dashboard**: profile settings, user posts, liked posts, and basic stats
- ✏️ **Editable User Profile** (avatar, bio, socials, country, gender)
- ✍️ **Add, Edit, Delete Posts** with a Quill WYSIWYG editor
- 🔒 **Secure Data Storage** in Supabase Postgres, managed through Prisma
- 🔄 **Server Actions** + **React Query** for fetching dynamic lists
- 📦 **Metadata** including dynamic OpenGraph tags and Canonical URLs

---

## Page Descriptions

### Home Page

- Featured post section
- Recent posts grid
- Call-to-action banner
- Stats: most commented and most liked posts, and most active authors
- Global header (logo, nav, search, theme toggle, user menu)
- Footer with links, small navigation, and copyright

### Post Page

- Full post view with title, image, content, and metadata
- Author info and reading time
- Tags and category
- Like button + social sharing options

### Author Page

- Public author profile
- Avatar, bio, join date, social links, and basic info
- Paginated list of posts with filters

### Search Page

- Dedicated page for discovering articles
- Search across title, preview text, and author names
- Category-based filtering
- Sorting and additional filters (e.g. minimum amount of likes/comments)
- Paginated results with clear empty-state messaging

### Dashboard

Accessible only to signed-in users.

- **Profile Settings**: manage avatar, display name, username, bio, date of birth, social links, country, and gender
- **Add Post**: create new posts with a full editor
- **My Posts**: view, edit, or delete your posts
- **Liked Posts**: see posts you've liked

> Dashboard pages are `noindex` for search engines.

### Additional Pages

- Category pages - Lists all available categories. Selecting one opens the All Posts page with the corresponding filters pre-applied
- Trending Posts - Shows the latest popular posts that meet the defined conditions
- Authors list - Similar to posts, but showcases authors, complete with filters and pagination
- App Info, About Us, Contact Us, Site Map - Technical pages providing information about the platform and ways to get in touch
- Custom error pages - 404 and other error pages for various situations
- Legal pages - Terms of Use and Privacy Policy

---

## Technical Details

- **Framework**: Next.js (App Router, TypeScript)
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Editor**: Quill
- **Styling**: Tailwind CSS + ShadCN
- **State & Data**: React Query with custom hooks
- **Meta / SEO**: static + dynamic metadata
- **Image Uploads**: Stored in Supabase Storage
- **EmailJS**: Sending messages from the Contact Us form
- **Deployment**: Vercel

---

## License

©2026 BroN

This repository is intended for portfolio/demo purposes. Permission is granted to view and run the project for personal evaluation. Reuse, redistribution, or commercial use is not permitted without written permission.

---

## Live Version

[https://next--blogs.vercel.app/](https://next--blogs.vercel.app/)
