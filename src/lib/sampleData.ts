import { Expense, Category, Budget } from './types';

export const defaultCategories: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#6366F1', icon: 'UtensilsCrossed' },
  { id: 'rent', name: 'Rent & Bills', color: '#EC4899', icon: 'Home' },
  { id: 'transport', name: 'Transport', color: '#22D3EE', icon: 'Car' },
  { id: 'shopping', name: 'Shopping', color: '#F59E0B', icon: 'ShoppingBag' },
  { id: 'health', name: 'Health', color: '#10B981', icon: 'HeartPulse' },
  { id: 'fun', name: 'Entertainment', color: '#A855F7', icon: 'Gamepad2' },
];

export const defaultBudget: Budget = {
  overall: 2800,
  perCategory: { food: 600, rent: 1300, transport: 250, shopping: 300, health: 150, fun: 200 },
};

const methods = ['Card', 'Cash', 'Transfer', 'Apple Pay'];
const foodItems = ['Grocery run', 'Coffee & pastry', 'Dinner out', 'Lunch with team', 'Brunch'];
const items: Record<string, string[]> = {
  food: foodItems,
  rent: ['Monthly rent', 'Electric bill', 'Internet', 'Water bill'],
  transport: ['Gas fill-up', 'Uber ride', 'Metro pass', 'Parking'],
  shopping: ['New sneakers', 'Headphones', 'Bookstore', 'Gift'],
  health: ['Pharmacy', 'Gym membership', 'Doctor visit'],
  fun: ['Movie night', 'Concert tickets', 'Streaming sub', 'Video game'],
};

function rnd(min: number, max: number) { return Math.random() * (max - min) + min; }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateSampleExpenses(): Expense[] {
  const out: Expense[] = [];
  const now = new Date();
  const cats = ['food', 'rent', 'transport', 'shopping', 'health', 'fun'];
  // Spread over current and previous month
  for (let monthsBack = 0; monthsBack <= 1; monthsBack++) {
    const count = monthsBack === 0 ? 22 : 18;
    for (let i = 0; i < count; i++) {
      const cat = pick(cats);
      const base = new Date(now.getFullYear(), now.getMonth() - monthsBack, Math.floor(rnd(1, 27)));
      let amount: number;
      if (cat === 'rent') amount = i % 5 === 0 ? 1300 : Math.round(rnd(40, 120));
      else if (cat === 'food') amount = Math.round(rnd(8, 75));
      else amount = Math.round(rnd(12, 180));
      out.push({
        id: crypto.randomUUID(),
        amount,
        category: cat,
        date: base.toISOString(),
        description: pick(items[cat]),
        method: pick(methods),
        createdAt: base.getTime(),
      });
    }
  }
  return out.sort((a, b) => b.createdAt - a.createdAt);
}