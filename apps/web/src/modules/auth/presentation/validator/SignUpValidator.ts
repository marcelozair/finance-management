import { object, string } from "yup";

export const signUpValidator = object({
  email: string().email().required(),
  password: string().required(),
  name: string().required(),
});
