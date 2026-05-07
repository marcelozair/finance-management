export interface ISignUpForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  currency: string;
}

export enum EnumStatusSignUp {
  REGISTER = "Register",
  VERIFICATION = "Verification",
  PREFERENCE = "Preference",
}
