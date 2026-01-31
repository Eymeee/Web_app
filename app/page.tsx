import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to Smart Grocery Box - manage your products, cart, and transactions"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/products"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
            Products
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage your product catalog with full CRUD operations
          </p>
        </Link>

        <Link
          href="/cart"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-green-600">
            Cart
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Add items and complete checkout transactions
          </p>
        </Link>

        <Link
          href="/transactions"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <line x1="12" x2="12" y1="2" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-purple-600">
            Transactions
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            View transaction history and order details
          </p>
        </Link>

        <Link
          href="/kiosk"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-600"
            >
              <rect width="5" height="5" x="3" y="3" rx="1" />
              <rect width="5" height="5" x="16" y="3" rx="1" />
              <rect width="5" height="5" x="3" y="16" rx="1" />
              <rect width="5" height="5" x="16" y="16" rx="1" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600">
            Kiosk Mode
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            QR code access and fullscreen display mode
          </p>
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-slate-900">Quick Start</h3>
        <ol className="space-y-3 text-sm text-slate-700">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
              1
            </span>
            <span>Create or view products in the Products section</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
              2
            </span>
            <span>Add items to your cart and adjust quantities</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
              3
            </span>
            <span>Complete checkout to create a transaction</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
              4
            </span>
            <span>Review transaction history and details</span>
          </li>
        </ol>
        <div className="mt-6">
          <Button asChild>
            <Link href="/products">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
