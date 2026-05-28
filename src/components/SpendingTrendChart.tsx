import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { byDay } from '@/lib/aggregations';
import { Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';

export function SpendingTrendChart({ expenses }: { expenses: Expense[] }) {
  const data = byDay(expenses);
  return (
    <Card>
      <CardHeader><CardTitle>Daily Spending Trend</CardTitle></CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-sm text-white/40">No data this month</div>
        ) : (
          <ResponsiveContainer width="100%" height={224}>
            <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ background: '#16181f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => `Day ${l}`} />
              <Area type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={2} fill="url(#grad)" animationDuration={800} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}