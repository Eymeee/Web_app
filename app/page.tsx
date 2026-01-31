'use client';

import { BrandHero } from '@/components/brand-hero';
import { FeatureCard } from '@/components/ui/feature-card';
import { StatCard } from '@/components/ui/stat-card';
import { useEffect, useState } from 'react';

interface Stats {
  productsCount: number;
  cartItemsCount: number;
  lastTransaction: { total: number; createdAt: string } | null;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    productsCount: 0,
    cartItemsCount: 0,
    lastTransaction: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch products count
        const productsRes = await fetch('/api/products');
        const products = await productsRes.json();
        
        // Fetch cart
        const cartRes = await fetch('/api/cart');
        const cart = await cartRes.json();
        
        // Fetch transactions
        const transactionsRes = await fetch('/api/transactions');
        const transactions = await transactionsRes.json();
        
        setStats({
          productsCount: Array.isArray(products) ? products.length : 0,
          cartItemsCount: cart?.items?.length ?? 0,
          lastTransaction: transactions?.[0] ?? null
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    void fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <BrandHero />

      {/* Stats Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Quick Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Products in Catalog"
            value={loading ? '...' : stats.productsCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
          />
          <StatCard
            label="Items in Cart"
            value={loading ? '...' : stats.cartItemsCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            }
          />
          <StatCard
            label="Last Transaction"
            value={loading ? '...' : stats.lastTransaction ? `€${stats.lastTransaction.total.toFixed(2)}` : 'N/A'}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
            trend={stats.lastTransaction && !loading ? new Date(stats.lastTransaction.createdAt).toLocaleDateString() : undefined}
          />
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Products"
            description="Manage your complete product catalog with full CRUD operations"
            href="/products"
            illustrationSrc="/illustrations/icon-products.svg"
            gradient="from-blue-500 to-indigo-600"
          />
          <FeatureCard
            title="Shopping Cart"
            description="Add items and complete checkout transactions seamlessly"
            href="/cart"
            illustrationSrc="/illustrations/icon-cart.svg"
            gradient="from-emerald-500 to-green-600"
          />
          <FeatureCard
            title="Transactions"
            description="View comprehensive transaction history and order details"
            href="/transactions"
            illustrationSrc="/illustrations/icon-transactions.svg"
            gradient="from-purple-500 to-pink-600"
          />
          <FeatureCard
            title="Kiosk Mode"
            description="QR code access and fullscreen display for kiosk deployment"
            href="/kiosk"
            illustrationSrc="/illustrations/icon-kiosk.svg"
            gradient="from-orange-500 to-amber-600"
          />
        </div>
      </section>
    </div>
  );
}
