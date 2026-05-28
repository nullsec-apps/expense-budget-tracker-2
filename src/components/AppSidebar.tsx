import { LayoutDashboard, Receipt, Wallet, Tags, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'categories', label: 'Categories', icon: Tags },
];

export function AppSidebar({ active, setActive, onAdd }: { active: string; setActive: (v: string) => void; onAdd: () => void }) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-60 flex-col border-r border-white/6 bg-[#0d0e14] p-4 md:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
          <Wallet size={18} className="text-white" />
        </div>
        <span className="font-display text-lg font-bold tracking-tight">Ledger</span>
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((n) => (
          <button key={n.id} onClick={() => setActive(n.id)} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200', active === n.id ? 'bg-indigo-500/15 text-indigo-300' : 'text-white/50 hover:bg-white/5 hover:text-white')}>
            <n.icon size={18} strokeWidth={2} />
            {n.label}
          </button>
        ))}
      </nav>
      <Separator className="my-4" />
      <Button onClick={onAdd} className="w-full"><Plus size={18} /> Add Expense</Button>
      <div className="mt-auto px-2 pt-4 text-xs text-white/25">Data saved locally on your device.</div>
    </aside>
  );
}

export function MobileNav({ active, setActive, onAdd }: { active: string; setActive: (v: string) => void; onAdd: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-white/8 bg-[#0d0e14]/95 backdrop-blur px-2 py-2 md:hidden">
      {nav.map((n) => (
        <button key={n.id} onClick={() => setActive(n.id)} className={cn('flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[10px] font-medium transition-colors', active === n.id ? 'text-indigo-300' : 'text-white/40')}>
          <n.icon size={20} />{n.label}
        </button>
      ))}
      <button onClick={onAdd} className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"><Plus size={20} /></button>
    </div>
  );
}