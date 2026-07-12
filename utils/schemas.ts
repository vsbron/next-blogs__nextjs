import { z } from "zod";
import { GENDERS, POST_CATEGORIES } from "./constants";
import {
  BIO_MAX,
  DISPLAYNAME_MAX,
  DISPLAYNAME_MIN,
  POST_PREVIEW_MAX,
  POST_PREVIEW_MIN,
  POST_TEXT_MAX,
  POST_TEXT_MIN,
  POST_TITLE_MAX,
  POST_TITLE_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
  MAX_IMAGE_FILE_SIZE,
  CONTACT_MESSAGE_MAX,
  CONTACT_NAME_MIN,
  CONTACT_NAME_MAX,
  COMMENT_TEXT_MIN,
  COMMENT_TEXT_MAX,
} from "./constantsUI";

// prettier-ignore
export const userSchema = z.object({
  username: z.string()
    .min(USERNAME_MIN, `Username should be at least ${USERNAME_MIN} characters`)
    .max(USERNAME_MAX, `Username should be at most ${USERNAME_MAX} characters`)
    .refine((val) => !/^User\d+$/.test(val), {message: "New username cannot be in this format: User[NUMBERS]" }),
  displayName: z
    .string()
    .min(DISPLAYNAME_MIN, `Display name should be at least ${DISPLAYNAME_MIN} characters`)
    .max(DISPLAYNAME_MAX, `Display name should be at most ${DISPLAYNAME_MAX} characters`),
  birthday: z.string().optional(),
  gender: z.enum(GENDERS, { message: "Please select a gender" }),
  country: z.string().optional(),
  bio: z.string()
    .max(BIO_MAX, `About text should be at most ${BIO_MAX} characters`).optional(),
  website: z.string(),
  facebook: z.string(),
  x: z.string(),
  instagram: z.string(),
  reddit: z.string(),
  showEmail: z.preprocess((val) => val === "true" || val === true, z.boolean()),
});

export type UserSchema = z.infer<typeof userSchema>;

/**********************************/

// prettier-ignore
export const postSchema = z.object({
  title: z
    .string()
    .min(POST_TITLE_MIN, `Post title should be at least ${POST_TITLE_MIN} characters`)
    .max(POST_TITLE_MAX, `Post title should be at most ${POST_TITLE_MAX} characters`),
  preview: z.string()
    .min(POST_PREVIEW_MIN, `Post preview should be at least ${POST_PREVIEW_MIN} characters`)
    .max(POST_PREVIEW_MAX, `Post preview should be at most ${POST_PREVIEW_MAX} characters`),
  text: z.string().refine(
    (text) => {
      const wordCount = text.split(" ").length;
      return wordCount >= POST_TEXT_MIN && wordCount <= POST_TEXT_MAX;
    },
    { message: `Post text must be between ${POST_TEXT_MIN} and ${POST_TEXT_MAX} words` }
  ),
  category: z.enum(POST_CATEGORIES, { message: "Please select a category" }),
});

export const imageSchema = z.object({
  imageUrl: validateImageFile(),
});

// prettier-ignore
function validateImageFile() {
  // Set maximum size for an image
  const maxUploadSize = MAX_IMAGE_FILE_SIZE;
  const acceptedFileTypes = ["image/"];

  return (
    z.instanceof(File).optional()
      // Check the size
      .refine((file) => !file || file.size <= maxUploadSize, "File size must be less than 1MB")
      // Check the file type
      .refine((file) => {
        return (!file || acceptedFileTypes.some((type) => file.type.startsWith(type)));
      }, "File must be an image")
  );
}

/**********************************/

// prettier-ignore
export const commentSchema = z.object({
  commentText: z.string()
    .min(COMMENT_TEXT_MIN, `Comment should be at least ${COMMENT_TEXT_MIN} characters`)
    .max(COMMENT_TEXT_MAX, `Comment should be at most ${COMMENT_TEXT_MAX} characters`),
  postId: z.number(),
});

/**********************************/

// prettier-ignore
export const contactUsSchema = z.object({
  name: z.string()
    .min(CONTACT_NAME_MIN, `Name should be at least ${CONTACT_NAME_MIN} characters`)
    .max(CONTACT_NAME_MAX, `Name should be at most ${CONTACT_NAME_MAX} characters`),
  email: z.email(),
  message: z.string()
    .max(CONTACT_MESSAGE_MAX, `Message should be at most ${CONTACT_MESSAGE_MAX} characters`),
});
