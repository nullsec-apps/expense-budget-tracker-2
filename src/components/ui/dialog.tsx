import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode; }

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ type: 'spring', damping: 22, stiffness: 320 }} className="relative z-10 w-full max-w-md">
            <div className="glass rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
              <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"><X size={18} /></button>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />;
}
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <h2 className={cn('font-display text-xl font-semibold', className)} {...props} />;
}