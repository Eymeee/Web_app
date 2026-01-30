'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

export function TransactionsListClient() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/transactions', { cache: 'no-store' });
      const json = (await res.json()) as ApiResponse<Transaction[]>;
      if (!res.ok || json.error) throw new Error(json.error?.message ?? 'Erreur');
      setTransactions(json.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-slate-500">Historique des encaissements.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
          Rafraîchir
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-sm">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-sm">
                  Aucune transaction.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs sm:text-sm">{txn.id}</TableCell>
                  <TableCell>
                    {new Date(txn.createdAt).toLocaleString('fr-FR', {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {txn.total.toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/transactions/${txn.id}`}>Voir</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
