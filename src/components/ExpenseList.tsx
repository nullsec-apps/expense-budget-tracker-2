import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectItem } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CategoryIcon } from './icons';
import { Category, Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';
import { Search, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { expenses: Expense[]; categories: Category[]; onEdit: (e: Expense) => void; onDelete: (id: string) => void; }

export function ExpenseList({ expenses, categories, onEdit, onDelete }: Props) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState<'date' | 'amount'>('date');

  const filtered = useMemo(() => {
    let r = expenses.filter((e) => e.description.toLowerCase().includes(q.toLowerCase()));
    if (cat !== 'all') r = r.filter((e) => e.category === cat);
    return r.sort((a, b) => sort === 'amount' ? b.amount - a.amount : b.createdAt - a.createdAt);
  }, [expenses, q, cat, sort]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <Input placeholder="Search expenses..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="w-full sm:w-44"><Select value={cat} onValueChange={setCat}><SelectItem value="all">All Categories</SelectItem>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</Select></div>
          <Button variant="outline" onClick={() => setSort(sort === 'date' ? 'amount' : 'date')}><ArrowUpDown size={15} />{sort === 'date' ? 'Date' : 'Amount'}</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-xs text-white/40">
                <th className="pb-2 pl-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="hidden pb-2 font-medium sm:table-cell">Method</th>
                <th className="hidden pb-2 font-medium md:table-cell">Date</th>
                <th className="pb-2 text-right font-medium">Amount</th>
                <th className="pb-2 pr-2"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((e) => {
                  const c = categories.find((x) => x.id === e.category);
                  return (
                    <motion.tr key={e.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group border-b border-white/4 hover:bg-white/5 transition-colors">
                      <td className="py-3 pl-2 font-medium">{e.description}</td>
                      <td className="py-3"><Badge style={{ background: (c?.color || '#64748b') + '22', color: c?.color || '#64748b' }}><CategoryIcon name={c?.icon || 'Tag'} size={11} className="mr-1" />{c?.name}</Badge></td>
                      <td className="hidden py-3 text-white/50 sm:table-cell">{e.method}</td>
                      <td className="hidden py-3 text-white/50 md:table-cell">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="py-3 text-right font-semibold">{formatCurrency(e.amount)}</td>
                      <td className="py-3 pr-2"><div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100"><button onClick={() => onEdit(e)} className="rounded p-1.5 text-white/50 hover:bg-white/10 hover:text-white"><Pencil size={14} /></button><button onClick={() => onDelete(e.id)} className="rounded p-1.5 text-white/50 hover:bg-red-500/20 hover:text-red-400"><Trash2 size={14} /></button></div></td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-white/40">No expenses match your filters.</div>}
        </div>
      </CardContent>
    </Card>
  );
}