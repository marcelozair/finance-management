import { object, string } from "yup";

// const phoneRegex = new RegExp(/^\+\d{1,3}\d{6,14}$/);

export const signUpValidator = object({
  email: string().email().required(),
  password: string().required(),
  name: string().required(),
  phone: string().required(),
});
