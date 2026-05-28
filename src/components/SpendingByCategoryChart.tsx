import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';

interface Props { data: Record<string, number>; categories: Category[]; }

export function SpendingByCategoryChart({ data, categories }: Props) {
  const chartData = Object.entries(data)
    .map(([catId, value]) => {
      const c = categories.find((x) => x.id === catId);
      return { name: c?.name || 'Other', value, color: c?.color || '#64748b' };
    })
    .sort((a, b) => b.value - a.value);
  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="h-full">
      <CardHeader><CardTitle>Spending by Category</CardTitle></CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-white/40">No spending this month</div>
        ) : (
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <div className="relative h-56 w-56 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={3} stroke="none" animationDuration={800}>
                    {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#16181f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} formatter={(v: number) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-white/40">Total</span>
                <span className="font-display text-xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5 w-full">
              {chartData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: d.color }} />
                  <span className="flex-1 text-sm text-white/70">{d.name}</span>
                  <span className="text-sm font-medium">{formatCurrency(d.value)}</span>
                  <span className="w-12 text-right text-xs text-white/40">{((d.value / total) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}