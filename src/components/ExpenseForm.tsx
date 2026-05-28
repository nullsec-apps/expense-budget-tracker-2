import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectItem } from './ui/select';
import { Button } from './ui/button';
import { Category, Expense } from '@/lib/types';

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  categories: Category[];
  onSubmit: (e: Omit<Expense, 'id' | 'createdAt'>) => void;
  editing?: Expense | null;
  onUpdate?: (id: string, patch: Partial<Expense>) => void;
}

const methods = ['Card', 'Cash', 'Transfer', 'Apple Pay'];

export function ExpenseForm({ open, onOpenChange, categories, onSubmit, editing, onUpdate }: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [method, setMethod] = useState('Card');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (editing) {
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDate(editing.date.slice(0, 10));
      setDescription(editing.description);
      setMethod(editing.method);
    } else if (open) {
      setAmount(''); setDescription(''); setMethod('Card');
      setCategory(categories[0]?.id || '');
      setDate(new Date().toISOString().slice(0, 10));
    }
    setErr('');
  }, [open, editing, categories]);

  const handle = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { setErr('Enter a valid amount'); return; }
    if (!description.trim()) { setErr('Add a short description'); return; }
    const payload = { amount: amt, category, date: new Date(date).toISOString(), description: description.trim(), method };
    if (editing && onUpdate) onUpdate(editing.id, payload);
    else onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader><DialogTitle>{editing ? 'Edit Expense' : 'Log New Expense'}</DialogTitle></DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/50">Amount (USD)</label>
          <Input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/50">Category</label>
            <Select value={category} onValueChange={setCategory}>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/50">Method</label>
            <Select value={method} onValueChange={setMethod}>{methods.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</Select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/50">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/50">Description</label>
          <Input placeholder="e.g. Grocery run" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {err && <p className="text-xs text-red-400">{err}</p>}
        <Button onClick={handle} className="w-full">{editing ? 'Save Changes' : 'Add Expense'}</Button>
      </div>
    </Dialog>
  );
}