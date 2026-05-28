export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO
  description: string;
  method: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Budget {
  overall: number;
  perCategory: Record<string, number>;
}