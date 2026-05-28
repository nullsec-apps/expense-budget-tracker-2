import { useEffect, useState } from 'react';

export function NumberTicker({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 900;
    const from = display;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [value]);
  return <>{format(display)}</>;
}