import { Card } from './ui/card';
import { Button } from './ui/button';
import { Wallet, Plus } from 'lucide-react';

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15"><Wallet size={28} className="text-indigo-400" /></div>
      <h3 className="font-display text-xl font-bold">No expenses yet</h3>
      <p className="mt-1 max-w-xs text-sm text-white/40">Start tracking your spending by logging your first expense.</p>
      <Button onClick={onAdd} className="mt-5"><Plus size={16} /> Log First Expense</Button>
    </Card>
  );
}