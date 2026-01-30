'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { AddToCartForm, type AddFormValues } from '@/components/cart/AddToCartForm';
import { CartList, type CartItem } from '@/components/cart/CartList';
import { Button } from '@/components/ui/button';

import type { ApiError } from '@/lib/errors';

type Product = {
  id: string;
  name: string;
  price: number;
  sku?: string | null;
};

type CartResponse = {
  items: CartItem[];
  total: number;
};

type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export function CartPageClient() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cart, setCart] = React.useState<CartResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  async function fetchProducts() {
    const response = await fetch('/api/products', { cache: 'no-store' });
    const json = (await response.json()) as ApiResponse<Product[]>;
    if (!response.ok || json.error) {
      throw new Error(json.error?.message ?? 'Erreur chargement produits');
    }
    setProducts(json.data ?? []);
  }

  async function fetchCart() {
    const response = await fetch('/api/cart', { cache: 'no-store' });
    const json = (await response.json()) as ApiResponse<CartResponse>;
    if (!response.ok || json.error) {
      throw new Error(json.error?.message ?? 'Erreur chargement panier');
    }
    setCart(json.data ?? { items: [], total: 0 });
  }

  async function refresh() {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchCart()]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void refresh();
  }, []);

  async function handleAdd(values: AddFormValues) {
    setSubmitting(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const json = (await response.json()) as ApiResponse<CartResponse>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur ajout panier');
      }
      setCart(json.data ?? cart);
      toast.success('Ajouté au panier');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(id: string, quantity: number) {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const json = (await response.json()) as ApiResponse<CartResponse>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur mise à jour');
      }
      setCart(json.data ?? cart);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/cart/${id}`, { method: 'DELETE' });
      const json = (await response.json()) as ApiResponse<CartResponse>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur suppression');
      }
      setCart(json.data ?? cart);
      toast.success('Article supprimé');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCheckout() {
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout', { method: 'POST' });
      const json = (await response.json()) as ApiResponse<{ id: string; total: number }>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur transaction');
      }
      toast.success('Transaction validée');
      await fetchCart();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const total = cart?.total ?? 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Panier</h1>
          <p className="text-sm text-slate-500">Gérez les articles et validez la transaction.</p>
        </div>
      </div>

      <AddToCartForm
        products={products.map((p) => ({ id: p.id, name: `${p.name} (${p.price.toFixed(2)} €)` }))}
        onSubmit={handleAdd}
        isSubmitting={submitting}
      />

      <CartList
        items={cart?.items ?? []}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isSubmitting={submitting}
      />

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">Total panier</div>
        <div className="text-2xl font-semibold text-slate-900">{total.toFixed(2)} €</div>
        <Button className="sm:w-48" disabled={submitting || (cart?.items.length ?? 0) === 0} onClick={() => void handleCheckout()}>
          Valider transaction
        </Button>
      </div>

      {loading && (
        <p className="text-sm text-slate-500">Chargement...</p>
      )}
    </section>
  );
}
