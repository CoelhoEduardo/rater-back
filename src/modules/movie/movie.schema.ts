import * as z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const movieInput = {
  title: z.string(),
  description: z.string(),
  director: z.string(),
  routers: z.array(z.string()),
  cast: z.array(z.string()),
  categories: z.array(z.string()),
  rating: z.number(),
  rating_count: z.number(),
  rating_average: z.number(),
  launch_year: z.number(),
  duration: z.number(),
  age_limited: z.number(),
  banner_url: z.string(),
};

const movieGenerated = {
  id: z.number(),
};

const createMovieSchema = z.object({
  ...movieInput,
});

const movieResponseSchema = z.object({
  ...movieInput,
  ...movieGenerated,
});

const moviesResponseSchema = z.array(movieResponseSchema);

export type CreateMovieInput = z.infer<typeof createMovieSchema>;

export const { schemas: movieSchemas, $ref } = buildJsonSchemas({
  createMovieSchema,
  movieResponseSchema,
  moviesResponseSchema,
});
