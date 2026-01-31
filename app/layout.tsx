import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/ui/navbar';

export const metadata: Metadata = {
  title: 'Smart Grocery Box',
  description: 'Smart grocery management system with products, cart, transactions, and kiosk mode'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* Subtle background pattern - low opacity */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage: 'url(/illustrations/bg-pattern.svg)',
            backgroundRepeat: 'repeat'
          }}
          aria-hidden
        />
        <div className="relative">
          <Navbar />
          <main className="container-page py-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
