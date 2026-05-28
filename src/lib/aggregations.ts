import { Expense } from './types';
import { monthKey } from './dateUtils';

export function filterByMonth(expenses: Expense[], key: string): Expense[] {
  return expenses.filter((e) => monthKey(e.date) === key);
}

export function totalSpent(expenses: Expense[]): number {
  return expenses.reduce((s, e) => s + e.amount, 0);
}

export function byCategory(expenses: Expense[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of expenses) out[e.category] = (out[e.category] || 0) + e.amount;
  return out;
}

export function byDay(expenses: Expense[]): { day: number; amount: number }[] {
  const map: Record<number, number> = {};
  for (const e of expenses) {
    const d = new Date(e.date).getDate();
    map[d] = (map[d] || 0) + e.amount;
  }
  return Object.entries(map)
    .map(([day, amount]) => ({ day: Number(day), amount }))
    .sort((a, b) => a.day - b.day);
}

export function availableMonths(expenses: Expense[]): string[] {
  const set = new Set(expenses.map((e) => monthKey(e.date)));
  return Array.from(set).sort().reverse();
}