import { Calendar } from 'lucide-react';
import { Select, SelectItem } from './ui/select';
import { monthLabel } from '@/lib/dateUtils';

export function MonthSelector({ months, value, onChange }: { months: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Calendar size={16} className="text-white/40" />
      <div className="w-48">
        <Select value={value} onValueChange={onChange}>
          {months.map((m) => <SelectItem key={m} value={m}>{monthLabel(m)}</SelectItem>)}
        </Select>
      </div>
    </div>
  );
}