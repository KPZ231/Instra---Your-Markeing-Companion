import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration file.
 * Database connection URL is read from the DATABASE_URL environment variable.
 * Driver adapter (@prisma/adapter-pg) is used for direct PostgreSQL connections.
 * @see https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/instra",
  },
});
