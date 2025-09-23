import { object, string } from "yup";

export const signInValidator = object({
  email: string().email().required(),
  password: string().required(),
});
