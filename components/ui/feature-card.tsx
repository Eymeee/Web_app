import Image from 'next/image';
import type { ReactNode } from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Illustration image src (e.g. /illustrations/icon-products.svg). Takes precedence over icon. */
  illustrationSrc?: string;
  href: string;
  gradient?: string;
}

export function FeatureCard({ title, description, icon, illustrationSrc, href, gradient = 'from-blue-500 to-indigo-600' }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group glass-card p-6 transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform group-hover:scale-110`}>
        {illustrationSrc ? (
          <Image src={illustrationSrc} alt="" width={32} height={32} className="h-8 w-8 object-contain" aria-hidden />
        ) : (
          icon
        )}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </Link>
  );
}
