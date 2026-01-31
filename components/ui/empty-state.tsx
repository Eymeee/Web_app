import Image from 'next/image';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Illustration image src (e.g. /illustrations/empty-products.svg). Takes precedence over icon when both provided. */
  illustrationSrc?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  illustrationSrc,
  action,
  className
}: EmptyStateProps) {
  const baseClasses =
    'flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center';
  return (
    <div
      className={className ? `${baseClasses} ${className}` : baseClasses}
    >
      {illustrationSrc ? (
        <div className="mb-4 h-24 w-32 text-slate-400 sm:h-28 sm:w-36">
          <Image
            src={illustrationSrc}
            alt=""
            width={144}
            height={112}
            className="h-full w-auto object-contain"
            aria-hidden
          />
        </div>
      ) : (
        icon && <div className="mb-4 text-slate-400">{icon}</div>
      )}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-slate-600">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
