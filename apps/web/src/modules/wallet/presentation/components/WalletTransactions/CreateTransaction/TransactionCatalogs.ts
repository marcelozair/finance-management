import { createListCollection } from "@chakra-ui/react";

export const TransactionCategoryEnum = {
  INITAL: "initial",
  FOOD: "food",
  TRANSPORT: "transport",
  ENTERTAINMENT: "entertainment",
  HEALTH: "health",
  EDUCATION: "education",
  UTILITIES: "utilities",
  SALARY: "salary",
  OTHER: "other",
} as const;

export const transactionCategoriesCatalog = createListCollection({
  items: [
    { label: "Initial", value: TransactionCategoryEnum.INITAL as string },
    { label: "Food", value: TransactionCategoryEnum.FOOD as string },
    { label: "Transport", value: TransactionCategoryEnum.TRANSPORT as string },
    {
      label: "Entertainment",
      value: TransactionCategoryEnum.ENTERTAINMENT as string,
    },
    { label: "Health", value: TransactionCategoryEnum.HEALTH as string },
    { label: "Education", value: TransactionCategoryEnum.EDUCATION as string },
    { label: "Utilities", value: TransactionCategoryEnum.UTILITIES as string },
    { label: "Salary", value: TransactionCategoryEnum.SALARY as string },
    { label: "Other", value: TransactionCategoryEnum.OTHER as string },
  ],
});

export const TransactionEnum = {
  INCOME: "income",
  EXPENSE: "expense",
  TRANSFER: "transfer",
} as const;

export const transactionTypeCatalog = createListCollection({
  items: [
    { label: "Income", value: TransactionEnum.INCOME as string },
    { label: "Expense", value: TransactionEnum.EXPENSE as string },
    { label: "Transfer", value: TransactionEnum.TRANSFER as string },
  ],
});
