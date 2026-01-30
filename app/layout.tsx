import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Smart-Grocery-Box app',
  description: 'Dashboard, produits, panier, transactions, kiosk'
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/kiosk', label: 'Kiosk' }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="border-b border-slate-200 bg-white">
          <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="text-sm font-semibold tracking-[0.2em] text-brand-700">
              Smart-Grocery-Box app
            </div>
            <nav className="flex flex-wrap gap-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent px-3 py-1 text-slate-600 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <main className="container-page py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
