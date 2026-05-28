import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogHeader, DialogTitle } from './ui/dialog';
import { Category, Expense } from '@/lib/types';
import { CategoryIcon, iconOptions } from './icons';
import { byCategory } from '@/lib/aggregations';
import { formatCurrency } from '@/lib/formatCurrency';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const palette = ['#6366F1', '#EC4899', '#22D3EE', '#F59E0B', '#10B981', '#A855F7', '#EF4444', '#84CC16'];

interface Props { categories: Category[]; monthExpenses: Expense[]; onAdd: (c: Omit<Category, 'id'>) => void; onUpdate: (id: string, p: Partial<Category>) => void; onDelete: (id: string) => void; }

export function CategoryManager({ categories, monthExpenses, onAdd, onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState(palette[0]);
  const [icon, setIcon] = useState(iconOptions[0]);
  const spent = byCategory(monthExpenses);

  const openNew = () => { setEditing(null); setName(''); setColor(palette[0]); setIcon(iconOptions[0]); setOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setColor(c.color); setIcon(c.icon); setOpen(true); };
  const save = () => {
    if (!name.trim()) return;
    if (editing) onUpdate(editing.id, { name: name.trim(), color, icon });
    else onAdd({ name: name.trim(), color, icon });
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <Button size="sm" onClick={openNew}><Plus size={15} /> New</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <div key={c.id} className="group flex items-center gap-3 rounded-xl border border-white/8 p-3 hover:bg-white/5 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: c.color + '22', color: c.color }}><CategoryIcon name={c.icon} size={18} /></span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{c.name}</p><p className="text-xs text-white/40">{formatCurrency(spent[c.id] || 0)} this month</p></div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => openEdit(c)} className="rounded p-1.5 text-white/50 hover:bg-white/10 hover:text-white"><Pencil size={14} /></button>
                <button onClick={() => onDelete(c.id)} className="rounded p-1.5 text-white/50 hover:bg-red-500/20 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader><DialogTitle>{editing ? 'Edit Category' : 'New Category'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="mb-1.5 block text-xs font-medium text-white/50">Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Travel" /></div>
          <div><label className="mb-2 block text-xs font-medium text-white/50">Color</label><div className="flex flex-wrap gap-2">{palette.map((p) => <button key={p} onClick={() => setColor(p)} className={cn('h-8 w-8 rounded-lg transition-transform', color === p && 'ring-2 ring-white ring-offset-2 ring-offset-[#16181f] scale-110')} style={{ background: p }} />)}</div></div>
          <div><label className="mb-2 block text-xs font-medium text-white/50">Icon</label><div className="flex flex-wrap gap-2">{iconOptions.map((ic) => <button key={ic} onClick={() => setIcon(ic)} className={cn('flex h-9 w-9 items-center justify-center rounded-lg border transition-colors', icon === ic ? 'border-indigo-400 bg-indigo-500/15 text-indigo-300' : 'border-white/10 text-white/50 hover:bg-white/5')}><CategoryIcon name={ic} size={16} /></button>)}</div></div>
          <Button onClick={save} className="w-full">{editing ? 'Save' : 'Create Category'}</Button>
        </div>
      </Dialog>
    </Card>
  );
}