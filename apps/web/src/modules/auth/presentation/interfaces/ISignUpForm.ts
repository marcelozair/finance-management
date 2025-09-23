export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

export enum EnumStatusSignUp {
  REGISTER = "Register",
  VERIFICATION = "Verification",
  PREFERENCE = "Preference",
}
