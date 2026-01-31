'use client';

import Link from 'next/link';
import { FeatureCard } from '@/components/ui/feature-card';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
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
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-16 text-white shadow-2xl md:px-12 lg:px-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Smart Grocery Box
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-blue-100 md:text-xl">
            Streamline your grocery management with intelligent product cataloging,
            seamless cart operations, and comprehensive transaction tracking
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 shadow-xl hover:bg-blue-50">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </section>

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
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            gradient="from-blue-500 to-indigo-600"
          />
          <FeatureCard
            title="Shopping Cart"
            description="Add items and complete checkout transactions seamlessly"
            href="/cart"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            }
            gradient="from-emerald-500 to-green-600"
          />
          <FeatureCard
            title="Transactions"
            description="View comprehensive transaction history and order details"
            href="/transactions"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
            gradient="from-purple-500 to-pink-600"
          />
          <FeatureCard
            title="Kiosk Mode"
            description="QR code access and fullscreen display for kiosk deployment"
            href="/kiosk"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <rect width="5" height="5" x="16" y="16" rx="1" />
              </svg>
            }
            gradient="from-orange-500 to-amber-600"
          />
        </div>
      </section>
    </div>
  );
}
