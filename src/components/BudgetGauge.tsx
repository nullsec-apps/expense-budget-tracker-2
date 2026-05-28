import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/formatCurrency';

export function BudgetGauge({ spent, budget }: { spent: number; budget: number }) {
  const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
  const color = pct < 70 ? '#10B981' : pct < 90 ? '#F59E0B' : '#EF4444';
  const r = 80; const circ = 2 * Math.PI * r;
  const remaining = budget - spent;

  return (
    <Card className="h-full">
      <CardHeader><CardTitle>Monthly Budget</CardTitle></CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
            <motion.circle cx="100" cy="100" r={r} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ - (pct / 100) * circ }} transition={{ type: 'spring', damping: 22, stiffness: 60 }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold" style={{ color }}>{pct.toFixed(0)}%</span>
            <span className="text-xs text-white/40">of budget used</span>
          </div>
        </div>
        <div className="mt-4 w-full space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-white/50">Spent</span><span className="font-medium">{formatCurrency(spent)}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Budget</span><span className="font-medium">{formatCurrency(budget)}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Remaining</span><span className="font-medium" style={{ color: remaining < 0 ? '#EF4444' : '#10B981' }}>{formatCurrency(remaining)}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}