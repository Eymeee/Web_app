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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="container-page py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
