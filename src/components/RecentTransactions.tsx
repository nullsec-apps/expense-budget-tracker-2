import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CategoryIcon } from './icons';
import { Category, Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';
import { relativeTime } from '@/lib/dateUtils';
import { motion } from 'framer-motion';

export function RecentTransactions({ expenses, categories }: { expenses: Expense[]; categories: Category[] }) {
  const recent = [...expenses].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
  return (
    <Card>
      <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
      <CardContent>
        {recent.length === 0 ? <div className="py-8 text-center text-sm text-white/40">No transactions yet</div> : (
          <div className="space-y-1">
            {recent.map((e, i) => {
              const c = categories.find((x) => x.id === e.category);
              return (
                <motion.div key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-white/5 transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: (c?.color || '#64748b') + '22', color: c?.color || '#64748b' }}>
                    <CategoryIcon name={c?.icon || 'Tag'} size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{e.description}</p>
                    <p className="text-xs text-white/40">{c?.name} · {relativeTime(e.date)}</p>
                  </div>
                  <span className="font-display text-sm font-semibold">-{formatCurrency(e.amount)}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}