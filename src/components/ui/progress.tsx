import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Progress({ value, color = '#6366F1', className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-white/10', className)}>
      <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${Math.min(100, value)}%` }} transition={{ type: 'spring', damping: 20, stiffness: 100 }} />
    </div>
  );
}