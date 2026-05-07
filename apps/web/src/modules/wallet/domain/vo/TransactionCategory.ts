import { ValueObject } from "src/core/domain/ValueObject";

export interface TransactionCategoryValue {
  label: string;
  color: string;
  icon: string;
}

export type SubCategory = {
  label: string;
  icon: string;
};

export type Category = {
  label: string;
  color: string;
  icon: string;
  subcategories: Record<string, SubCategory>;
};

export const TransactionCategoryEnum: Record<string, Category> = {
  food: {
    label: "Food & Drinks",
    color: "orange.400",
    icon: "food",
    subcategories: {
      groceries: { label: "Groceries", icon: "cart" },
      dining: { label: "Dining Out", icon: "restaurant" },
      fast_food: { label: "Fast Food", icon: "burger" },
      coffee: { label: "Coffee", icon: "coffee" },
      delivery: { label: "Delivery", icon: "delivery" },
    },
  },

  transport: {
    label: "Transport",
    color: "blue.400",
    icon: "car",
    subcategories: {
      public: { label: "Public Transport", icon: "bus" },
      taxi: { label: "Taxi / Uber", icon: "taxi" },
      fuel: { label: "Fuel", icon: "fuel" },
      parking: { label: "Parking", icon: "parking" },
      maintenance: { label: "Car Maintenance", icon: "tools" },
    },
  },

  entertainment: {
    label: "Entertainment",
    color: "purple.400",
    icon: "game",
    subcategories: {
      cinema: { label: "Cinema", icon: "movie" },
      streaming: { label: "Streaming", icon: "tv" },
      games: { label: "Games", icon: "controller" },
      events: { label: "Events", icon: "ticket" },
    },
  },

  pets: {
    label: "Pets",
    color: "pink.400",
    icon: "pet",
    subcategories: {
      food: { label: "Pet Food", icon: "pet-food" },
      vet: { label: "Vet", icon: "health" },
      grooming: { label: "Grooming", icon: "scissors" },
    },
  },

  income: {
    label: "Income",
    color: "green.500",
    icon: "wallet",
    subcategories: {
      salary: { label: "Salary", icon: "salary" },
      freelance: { label: "Freelance", icon: "laptop" },
    },
  },

  other: {
    label: "Other",
    color: "gray.400",
    icon: "other",
    subcategories: {},
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
