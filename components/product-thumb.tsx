'use client';

/**
 * Generates a deterministic gradient circle with initials from product name.
 * No DB storage - computed in UI only.
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase().slice(0, 2);
  }
  return name.slice(0, 2).toUpperCase() || '??';
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const GRADIENT_PAIRS = [
  ['from-amber-400 to-orange-500'],
  ['from-emerald-400 to-teal-500'],
  ['from-blue-400 to-indigo-500'],
  ['from-violet-400 to-purple-500'],
  ['from-rose-400 to-pink-500'],
  ['from-cyan-400 to-sky-500'],
  ['from-lime-400 to-green-500'],
  ['from-fuchsia-400 to-purple-500']
] as const;

export interface ProductThumbProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProductThumb({ name, size = 'md', className = '' }: ProductThumbProps) {
  const initials = getInitials(name);
  const gradientIndex = hashString(name) % GRADIENT_PAIRS.length;
  const gradient = GRADIENT_PAIRS[gradientIndex][0];

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-semibold text-white shadow-sm ${sizeClasses[size]} ${className}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}
