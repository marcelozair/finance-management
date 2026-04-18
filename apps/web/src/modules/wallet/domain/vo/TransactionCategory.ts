import { ValueObject } from "src/core/domain/ValueObject";

export interface TransactionCategoryValue {
  label: string;
  color: string;
  icon: string;
}

export const TransactionCategoryEnum: {
  [key: string]: TransactionCategoryValue;
} = {
  initial: {
    label: "Initial",
    color: "gray.500",
    icon: "wallet",
  },
  food: {
    label: "Food",
    color: "orange.400",
    icon: "food",
  },
  transport: {
    label: "Transport",
    color: "blue.400",
    icon: "transport",
  },
  entertainment: {
    label: "Entertainment",
    color: "purple.400",
    icon: "entertainment",
  },
  health: {
    label: "Health",
    color: "red.400",
    icon: "health",
  },
  education: {
    label: "Education",
    color: "teal.400",
    icon: "education",
  },
  utilities: {
    label: "Utilities",
    color: "yellow.500",
    icon: "utilities",
  },
  salary: {
    label: "Salary",
    color: "green.500",
    icon: "salary",
  },
  other: {
    label: "Other",
    color: "gray.400",
    icon: "other",
  },
};

export class TransactionCategory extends ValueObject<TransactionCategoryValue> {
  constructor(value: string) {
    if (!TransactionCategory.isValid(value)) {
      throw new Error("Invalid transaction category");
    }

    super(TransactionCategoryEnum[value]);
  }

  private static isValid(value: string): boolean {
    return Object.keys(TransactionCategoryEnum).includes(value);
  }
}
