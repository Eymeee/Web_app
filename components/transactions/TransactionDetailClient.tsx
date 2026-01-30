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
      <div>
        <h1 className="text-2xl font-semibold">Transaction</h1>
        <p className="text-sm text-slate-500">Détails et lignes.</p>
      </div>

      {loading || !transaction ? (
        <p className="text-sm text-slate-500">Chargement...</p>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-1 text-sm sm:grid-cols-2">
              <div>
                <span className="text-slate-500">ID</span>
                <p className="font-mono text-sm">{transaction.id}</p>
              </div>
              <div>
                <span className="text-slate-500">Date</span>
                <p>
                  {new Date(transaction.createdAt).toLocaleString('fr-FR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Total</span>
                <p className="text-lg font-semibold">{transaction.total.toFixed(2)} €</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="hidden sm:table-cell">PU</TableHead>
                  <TableHead>Qté</TableHead>
                  <TableHead className="text-right">Ligne</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-sm">
                      Aucune ligne.
                    </TableCell>
                  </TableRow>
                ) : (
                  transaction.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.product?.name ?? '—'}
                        <p className="text-xs text-slate-500">{item.product?.sku ?? ''}</p>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{item.unitPrice.toFixed(2)} €</TableCell>
                      <TableCell>{item.quantity}</TableCell>
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
      )}
    </section>
  );
}
