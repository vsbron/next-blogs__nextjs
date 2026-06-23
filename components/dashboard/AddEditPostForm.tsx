"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { SubmitButton } from "@/components/form/Buttons";
import CurrentImage from "@/components/form/CurrentImage";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import SelectInput from "@/components/form/SelectInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Card, CardContent } from "@/components/ui/card";

import { createEditPostAction, editPostAction } from "@/utils/actions/post";
import { POST_CATEGORIES } from "@/utils/constants";
import { MAX_IMAGE_FILE_SIZE } from "@/utils/constantsUI";
import { handleFormAction } from "@/utils/helpers";
import { imageSchema, postSchema } from "@/utils/schemas";
import { Post } from "@/utils/types";

// Type for form values
type FormValues = {
  title: string;
  preview: string;
  text: string;
  category: string;
  imageUrl?: File;
};

// The component
function AddEditPostForm({ defaultValues }: { defaultValues?: Post }) {
  // Get the query client
  const queryClient = useQueryClient();

  // Combine 2 schemas
  const combinedSchema = z.intersection(postSchema, imageSchema);

  // Get the form values from React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(combinedSchema),
    mode: "onBlur",
    defaultValues: {
      title: defaultValues?.title || "",
      preview: defaultValues?.preview || "",
      text: defaultValues?.text || "",
      category: defaultValues?.category || "",
    },
  });

  // Get the router
  const router = useRouter();

  // On submit handler
  const onSubmit = async (data: FormValues) => {
    // Preparing the post image
    let imageToUpload: File | string | undefined = undefined;

    if (data.imageUrl) {
      // User attached a new file
      imageToUpload = data.imageUrl;
    } else if (defaultValues?.imageUrl) {
      // keep existing URL
      imageToUpload = defaultValues.imageUrl;
    }

    // Set the correct action for post handling
    const correctAction = defaultValues
      ? (formData: FormData) => editPostAction(formData, defaultValues.id)
      : createEditPostAction;

    // Guard cause for big images
    if (
      imageToUpload instanceof File &&
      imageToUpload.size > MAX_IMAGE_FILE_SIZE
    )
      throw new Error("Image is too big");

    // Handle the form submission
    const result = await handleFormAction(correctAction, {
      ...data,
      imageUrl: imageToUpload,
    });

    // If success, trigger a message and invalidate query
    if (result.success) router.push("/dashboard/my-posts");
    queryClient.invalidateQueries({ queryKey: ["user-posts"] });
  };

  // Returned JSX
  return (
    <section>
      <Card className="max-w-200">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="basic-form">
            {/* Category */}
            <SelectInput
              id="category"
              options={POST_CATEGORIES}
              /* @ts-expect-error - RHF Control type mismatch after version bump, low priority */
              control={control}
              error={errors.category?.message}
            />

            {/* Title field */}
            <FormInput
              id="title"
              label="Post title"
              type="text"
              {...register("title")}
              error={errors.title?.message}
            />

            {/* Preview field */}
            <FormInput
              id="preview"
              label="Post preview"
              type="text"
              {...register("preview")}
              error={errors.preview?.message}
            />

            {/* Text field */}
            <TextAreaInput
              id="text"
              label="Compose your post"
              control={control}
              {...register("text")}
              error={errors.text?.message}
            />

            {/* Attach an image */}
            <ImageInput
              {...register("imageUrl")}
              label="Add an image (≤1MB, 21:9 ratio)"
              setValue={setValue}
              error={errors.imageUrl?.message}
            />

            {/* Display current image */}
            {defaultValues?.imageUrl && (
              <CurrentImage imageUrl={defaultValues?.imageUrl} />
            )}

            {/* Submit button */}
            <SubmitButton
              text={defaultValues ? "Edit post" : "Submit post"}
              isPending={isSubmitting}
            />
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default AddEditPostForm;
