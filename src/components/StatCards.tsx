import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { NumberTicker } from './NumberTicker';
import { TrendingUp, TrendingDown, Wallet, PieChart, CalendarDays } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/formatCurrency';
import { motion } from 'framer-motion';

interface Stat { label: string; value: number; format: (n: number) => string; delta?: number; icon: any; sub?: string; }

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/45">{s.label}</span>
              <s.icon size={16} className="text-indigo-400" />
            </div>
            <div className="mt-3 font-display text-2xl font-bold tracking-tight">
              <NumberTicker value={s.value} format={s.format} />
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              {s.delta !== undefined ? (
                <Badge className={s.delta >= 0 ? 'bg-red-500/15 text-red-300' : 'bg-emerald-500/15 text-emerald-300'}>
                  {s.delta >= 0 ? <TrendingUp size={11} className="mr-1" /> : <TrendingDown size={11} className="mr-1" />}
                  {formatPercent(s.delta)}
                </Badge>
              ) : s.sub ? <span className="text-xs text-white/40">{s.sub}</span> : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export { Wallet, PieChart, CalendarDays };