'use client';

import * as React from 'react';
import { notFound, useParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { PageHeader } from '@/components/ui/page-header';
import { CardSkeleton } from '@/components/ui/loading-skeleton';
import { ProductThumb } from '@/components/product-thumb';
import type { ApiError } from '@/lib/errors';

export type TransactionItem = {
  id: string;
  transactionId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product: {
    id: string;
    name: string;
    price: number;
    sku: string | null;
  } | null;
};

export type Transaction = {
  id: string;
  total: number;
  createdAt: string;
  items: TransactionItem[];
};

type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export function TransactionDetailClient() {
  const params = useParams<{ id: string }>();
  const [transaction, setTransaction] = React.useState<Transaction | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFoundState, setNotFoundState] = React.useState(false);

  React.useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/transactions/${params.id}`, { cache: 'no-store' });
      const json = (await res.json()) as ApiResponse<Transaction>;
      if (res.status === 404 || json.error?.code === 'NOT_FOUND') {
        setNotFoundState(true);
        return;
      }
      if (!res.ok || json.error) throw new Error(json.error?.message ?? 'Erreur');
      setTransaction(json.data ?? null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (notFoundState) {
    return notFound();
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title={transaction ? `Transaction ${transaction.id}` : 'Transaction Details'}
        description="View complete transaction information and line items"
      />

      {loading || !transaction ? (
        <CardSkeleton count={2} />
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Transaction Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Transaction ID
                </span>
                <p className="font-mono text-sm text-slate-900">{transaction.id}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Date & Time
                </span>
                <p className="text-sm text-slate-900">
                  {new Date(transaction.createdAt).toLocaleString('fr-FR', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Amount
                </span>
                <p className="text-2xl font-bold text-slate-900">
                  {transaction.total.toFixed(2)} €
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-slate-900">
              Order Items ({transaction.items.length})
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden sm:table-cell">Unit Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-sm">
                        No items in this transaction
                      </TableCell>
                    </TableRow>
                  ) : (
                    transaction.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <ProductThumb
                              name={item.product?.name ?? 'Unknown'}
                              size="sm"
                            />
                            <div>
                              <div className="font-medium">
                                {item.product?.name ?? 'Unknown Product'}
                              </div>
                              {item.product?.sku && (
                                <p className="text-xs text-slate-500">
                                  SKU: {item.product.sku}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {item.unitPrice.toFixed(2)} €
                        </TableCell>
                        <TableCell>×{item.quantity}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {item.lineTotal.toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
