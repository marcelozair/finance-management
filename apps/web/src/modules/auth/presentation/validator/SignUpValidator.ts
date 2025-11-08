import { object, string } from "yup";

const phoneRegex = new RegExp(/^\+\d{1,3}\d{6,12}$/);
const nameRegex = new RegExp(
  /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/
);

export const signUpValidator = object({
  email: string().email().required(),
  password: string()
    .min(12, "Invalid value, min length 12 characters")
    .trim()
    .required(),
  name: string()
    .matches(nameRegex, "Please enter a valid value.")
    .trim()
    .required(),
  phone: string()
    .matches(phoneRegex, "Please enter a valid value.")
    .trim()
    .required(),
});
