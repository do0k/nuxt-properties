import { lucia } from "lucia";
import { h3 } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  adapter: prisma(client),
  getUserAttributes: (data) => {
    return {
      username: data.username
    };
  },
});

export type Auth = typeof auth;
