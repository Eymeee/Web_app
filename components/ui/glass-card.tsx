import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  const baseClasses = 'glass-card p-6';
  return (
    <div className={className ? `${baseClasses} ${className}` : baseClasses}>
      {children}
    </div>
  );
}
