import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Authors collection schema
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .object({
        facebook: z.string().url().optional(),
        twitter: z.string().url().optional(),
        instagram: z.string().url().optional(),
      })
      .optional(),
  }),
});

// Posts collection schema
const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    authors: z.array(z.string()).default(["Admin"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
  pages: pagesCollection,
};
