import * as React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Select({ value, onValueChange, children, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={cn(
        'flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 transition-all cursor-pointer appearance-none',
        className
      )}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value} className="bg-[#16181f] text-white">{children}</option>;
}