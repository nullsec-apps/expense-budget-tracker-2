import { useCallback, useEffect, useState } from 'react';
import { Expense, Category, Budget } from '@/lib/types';
import { readStore, writeStore } from '@/lib/storage';
import { defaultCategories, defaultBudget, generateSampleExpenses } from '@/lib/sampleData';

const EK = 'ledger.expenses';
const CK = 'ledger.categories';
const BK = 'ledger.budget';

export function useFinanceData() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState<Budget>(defaultBudget);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = readStore<Expense[] | null>(EK, null);
    if (existing && existing.length) {
      setExpenses(existing);
    } else {
      const seed = generateSampleExpenses();
      setExpenses(seed);
      writeStore(EK, seed);
    }
    setCategories(readStore<Category[]>(CK, defaultCategories));
    setBudget(readStore<Budget>(BK, defaultBudget));
    setReady(true);
  }, []);

  useEffect(() => { if (ready) writeStore(EK, expenses); }, [expenses, ready]);
  useEffect(() => { if (ready) writeStore(CK, categories); }, [categories, ready]);
  useEffect(() => { if (ready) writeStore(BK, budget); }, [budget, ready]);

  const addExpense = useCallback((e: Omit<Expense, 'id' | 'createdAt'>) => {
    setExpenses((prev) => [{ ...e, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev]);
  }, []);
  const updateExpense = useCallback((id: string, patch: Partial<Expense>) => {
    setExpenses((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);
  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addCategory = useCallback((c: Omit<Category, 'id'>) => {
    setCategories((prev) => [...prev, { ...c, id: crypto.randomUUID() }]);
  }, []);
  const updateCategory = useCallback((id: string, patch: Partial<Category>) => {
    setCategories((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);
  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { ready, expenses, categories, budget, setBudget, addExpense, updateExpense, deleteExpense, addCategory, updateCategory, deleteCategory };
}

export type FinanceData = ReturnType<typeof useFinanceData>;