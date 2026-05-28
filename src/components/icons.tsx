import { UtensilsCrossed, Home, Car, ShoppingBag, HeartPulse, Gamepad2, Tag, LucideIcon } from 'lucide-react';

const map: Record<string, LucideIcon> = { UtensilsCrossed, Home, Car, ShoppingBag, HeartPulse, Gamepad2, Tag };

export function CategoryIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Icon = map[name] || Tag;
  return <Icon size={size} strokeWidth={2} className={className} />;
}

export const iconOptions = ['UtensilsCrossed', 'Home', 'Car', 'ShoppingBag', 'HeartPulse', 'Gamepad2', 'Tag'];