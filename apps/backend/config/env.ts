import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(4000),
  STORAGE_ADAPTER: z.string().default("local"),
  AVATAR_STORAGE_PATH: z.string().optional(),
});

export const env = envSchema.parse(process.env);