import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from 'react';

type Variant = 'red' | 'ghost';
const styles: Record<Variant, string> = {
  red: 'bg-kc-red text-white hover:bg-kc-red-light',
  ghost: 'border border-steel-dark text-steel-light hover:border-steel-grey hover:text-white',
};
export function Button(
  { href, variant = 'red', className, children, ...rest }:
  { href: string; variant?: Variant; className?: string } & ComponentProps<typeof Link>
) {
  return (
    <Link href={href}
      className={cn('inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition', styles[variant], className)}
      {...rest}>
      {children}
    </Link>
  );
}
