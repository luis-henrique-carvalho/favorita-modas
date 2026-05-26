import * as userSchema from "./user";
import * as categorySchema from "./category";
import * as productSchema from "./product";
import * as leadSchema from "./lead";

export const schema = {
  ...userSchema,
  ...categorySchema,
  ...productSchema,
  ...leadSchema,
};

export * from "./user";
export * from "./category";
export * from "./product";
export * from "./lead";
