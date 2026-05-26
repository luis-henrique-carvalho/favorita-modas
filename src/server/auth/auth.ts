import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "../db";
import * as userSchema from "../db/schema/user";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: userSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "MANAGER",
      },
    },
  },
});
