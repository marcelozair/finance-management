import * as yup from "yup";

import { TransactionEnum } from "./CategorySelect/TransactionCatalogs";

export interface CreateTransactionForm {
  amount: number;
  concept: string;
  type: string;
  categoryId: number;
  subCategoryId: number;
  date: string;
  destinationWalletId: number | null;
}

export const createTransactionSchema = yup
  .object<CreateTransactionForm>()
  .shape({
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    concept: yup
      .string()
      .required("Concept is required")
      .max(30, "Max characters exceeded (Max 30 characters)"),
    type: yup.string().required("Type is required"),
    categoryId: yup
      .number()
      .required("Category is required")
      .typeError("Category is required"),
    subCategoryId: yup
      .number()
      .required("Sub-category is required")
      .typeError("Sub-category is required"),
    date: yup
      .string()
      .required("Date is required")
      .default(() => new Date().toISOString().split("T")[0]),
    destinationWalletId: yup
      .number()
      .nullable()
      .default(null)
      .typeError("Destination wallet must be a number")
      .when("type", {
        then: (schema) =>
          schema.required("Destination wallet is required for transfers"),
        otherwise: (schema) => schema.notRequired(),
        is: (value: string) => value === TransactionEnum.TRANSFER,
      }),
  });
