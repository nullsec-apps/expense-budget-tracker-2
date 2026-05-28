import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Budget, Category, Expense } from '@/lib/types';
import { byCategory, totalSpent } from '@/lib/aggregations';
import { formatCurrency } from '@/lib/formatCurrency';
import { CategoryIcon } from './icons';
import { useState } from 'react';
import { Save } from 'lucide-react';

interface Props { budget: Budget; setBudget: (b: Budget) => void; categories: Category[]; monthExpenses: Expense[]; }

export function BudgetManager({ budget, setBudget, categories, monthExpenses }: Props) {
  const [draft, setDraft] = useState<Budget>(budget);
  const spentByCat = byCategory(monthExpenses);
  const totalSpentVal = totalSpent(monthExpenses);
  const dirty = JSON.stringify(draft) !== JSON.stringify(budget);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Overall Monthly Budget</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-white/50">Total Budget (USD)</label>
              <Input type="number" value={draft.overall} onChange={(e) => setDraft({ ...draft, overall: parseFloat(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-sm"><span className="text-white/50">Spent {formatCurrency(totalSpentVal)}</span><span className="text-white/50">{draft.overall > 0 ? ((totalSpentVal / draft.overall) * 100).toFixed(0) : 0}%</span></div>
            <Progress value={draft.overall > 0 ? (totalSpentVal / draft.overall) * 100 : 0} color={totalSpentVal > draft.overall ? '#EF4444' : '#6366F1'} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Per-Category Limits</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          {categories.map((c) => {
            const limit = draft.perCategory[c.id] || 0;
            const spent = spentByCat[c.id] || 0;
            const pct = limit > 0 ? (spent / limit) * 100 : 0;
            return (
              <div key={c.id}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: c.color + '22', color: c.color }}><CategoryIcon name={c.icon} size={14} /></span>
                  <span className="flex-1 text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-white/40">{formatCurrency(spent)} / </span>
                  <div className="w-24"><Input type="number" value={limit} onChange={(e) => setDraft({ ...draft, perCategory: { ...draft.perCategory, [c.id]: parseFloat(e.target.value) || 0 } })} className="h-8 text-right text-xs" /></div>
                </div>
                <Progress value={pct} color={pct > 100 ? '#EF4444' : pct > 85 ? '#F59E0B' : c.color} />
              </div>
            );
          })}
          {dirty && <Button onClick={() => setBudget(draft)} className="w-full"><Save size={16} /> Save Budget</Button>}
        </CardContent>
      </Card>
    </div>
  );
}