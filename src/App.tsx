import { useState, useMemo } from 'react';
import { AppSidebar, MobileNav } from './components/AppSidebar';
import { MonthSelector } from './components/MonthSelector';
import { ExpenseForm } from './components/ExpenseForm';
import { StatCards, Wallet, PieChart, CalendarDays } from './components/StatCards';
import { SpendingByCategoryChart } from './components/SpendingByCategoryChart';
import { SpendingTrendChart } from './components/SpendingTrendChart';
import { BudgetGauge } from './components/BudgetGauge';
import { RecentTransactions } from './components/RecentTransactions';
import { ExpenseList } from './components/ExpenseList';
import { BudgetManager } from './components/BudgetManager';
import { CategoryManager } from './components/CategoryManager';
import { EmptyState } from './components/EmptyState';
import { useFinanceData } from './hooks/useFinanceData';
import { filterByMonth, byCategory, totalSpent, availableMonths } from './lib/aggregations';
import { monthKey, monthLabel, prevMonthKey, daysInMonth } from './lib/dateUtils';
import { formatCurrency } from './lib/formatCurrency';
import { Coins } from 'lucide-react';
import { Expense } from './lib/types';

export default function App() {
  const data = useFinanceData();
  const [active, setActive] = useState('dashboard');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [month, setMonth] = useState(monthKey(new Date()));

  const months = useMemo(() => {
    const m = availableMonths(data.expenses);
    const cur = monthKey(new Date());
    if (!m.includes(cur)) m.unshift(cur);
    return m;
  }, [data.expenses]);

  const monthExpenses = useMemo(() => filterByMonth(data.expenses, month), [data.expenses, month]);
  const prevExpenses = useMemo(() => filterByMonth(data.expenses, prevMonthKey(month)), [data.expenses, month]);

  const stats = useMemo(() => {
    const total = totalSpent(monthExpenses);
    const prevTotal = totalSpent(prevExpenses);
    const delta = prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : undefined;
    const cats = byCategory(monthExpenses);
    const largestId = Object.entries(cats).sort((a, b) => b[1] - a[1])[0]?.[0];
    const largestCat = data.categories.find((c) => c.id === largestId);
    const dim = daysInMonth(month);
    const today = new Date();
    const elapsed = monthKey(today) === month ? today.getDate() : dim;
    return [
      { label: 'Total Spent', value: total, format: formatCurrency, delta, icon: Coins },
      { label: 'Remaining Budget', value: Math.max(0, data.budget.overall - total), format: formatCurrency, icon: Wallet, sub: `of ${formatCurrency(data.budget.overall)}` },
      { label: 'Largest Category', value: cats[largestId!] || 0, format: formatCurrency, icon: PieChart, sub: largestCat?.name || '—' },
      { label: 'Avg Daily Spend', value: elapsed > 0 ? total / elapsed : 0, format: formatCurrency, icon: CalendarDays, sub: `over ${elapsed} days` },
    ];
  }, [monthExpenses, prevExpenses, data.budget, data.categories, month]);

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (e: Expense) => { setEditing(e); setFormOpen(true); };

  if (!data.ready) return <div className="flex h-screen items-center justify-center text-white/40">Loading…</div>;

  const titles: Record<string, string> = { dashboard: 'Dashboard', expenses: 'All Expenses', budget: 'Budget', categories: 'Categories' };

  return (
    <div className="min-h-screen bg-[#0B0C10]">
      <AppSidebar active={active} setActive={setActive} onAdd={openAdd} />
      <MobileNav active={active} setActive={setActive} onAdd={openAdd} />
      <main className="px-4 pb-24 pt-6 md:ml-60 md:px-8 md:pb-8">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{titles[active]}</h1>
            <p className="text-sm text-white/40">{monthLabel(month)}</p>
          </div>
          {(active === 'dashboard' || active === 'expenses') && <MonthSelector months={months} value={month} onChange={setMonth} />}
        </header>

        {active === 'dashboard' && (
          data.expenses.length === 0 ? <EmptyState onAdd={openAdd} /> : (
            <div className="space-y-4">
              <StatCards stats={stats} />
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2"><SpendingByCategoryChart data={byCategory(monthExpenses)} categories={data.categories} /></div>
                <BudgetGauge spent={totalSpent(monthExpenses)} budget={data.budget.overall} />
              </div>
              <SpendingTrendChart expenses={monthExpenses} />
              <RecentTransactions expenses={monthExpenses} categories={data.categories} />
            </div>
          )
        )}

        {active === 'expenses' && (
          data.expenses.length === 0 ? <EmptyState onAdd={openAdd} /> :
          <ExpenseList expenses={monthExpenses} categories={data.categories} onEdit={openEdit} onDelete={data.deleteExpense} />
        )}

        {active === 'budget' && <BudgetManager budget={data.budget} setBudget={data.setBudget} categories={data.categories} monthExpenses={monthExpenses} />}

        {active === 'categories' && <CategoryManager categories={data.categories} monthExpenses={monthExpenses} onAdd={data.addCategory} onUpdate={data.updateCategory} onDelete={data.deleteCategory} />}
      </main>

      <ExpenseForm open={formOpen} onOpenChange={setFormOpen} categories={data.categories} onSubmit={data.addExpense} editing={editing} onUpdate={data.updateExpense} />
    </div>
  );
}