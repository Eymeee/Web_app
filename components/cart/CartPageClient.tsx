'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { AddToCartForm, type AddFormValues } from '@/components/cart/AddToCartForm';
import { CartList, type CartItem } from '@/components/cart/CartList';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { CardSkeleton } from '@/components/ui/loading-skeleton';

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
  const cartEmpty = (cart?.items.length ?? 0) === 0;

  return (
    <section className="space-y-6">
      <PageHeader
        title="Shopping Cart"
        description="Add items to your cart and complete checkout to create a transaction"
      />

      {loading ? (
        <CardSkeleton count={2} />
      ) : (
        <>
          {products.length > 0 && (
            <AddToCartForm
              products={products.map((p) => ({
                id: p.id,
                name: `${p.name} (${p.price.toFixed(2)} €)`
              }))}
              onSubmit={handleAdd}
              isSubmitting={submitting}
            />
          )}

          {cartEmpty && !loading ? (
            <EmptyState
              title="Your cart is empty"
              description="Add products to your cart to get started with a transaction"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              }
            />
          ) : (
            <>
              <CartList
                items={cart?.items ?? []}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                isSubmitting={submitting}
              />

              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-slate-500">Cart Total</div>
                  <div className="text-3xl font-bold text-slate-900">
                    {total.toFixed(2)} €
                  </div>
                </div>
                <Button
                  size="lg"
                  className="sm:w-48"
                  disabled={submitting || cartEmpty}
                  onClick={() => void handleCheckout()}
                >
                  {submitting ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
