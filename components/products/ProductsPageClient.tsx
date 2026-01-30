'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ProductDialog } from '@/components/products/ProductDialog';
import { ConfirmDialog } from '@/components/products/ConfirmDialog';

type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

type Product = {
  id: string;
  name: string;
  price: number;
  sku?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function ProductsPageClient() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editTarget, setEditTarget] = React.useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Product | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku?.toLowerCase().includes(term)
      );
    });
  }, [products, query]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const json = (await response.json()) as ApiResponse<Product[]>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur de chargement');
      }
      setProducts(json.data ?? []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void fetchProducts();
  }, []);

  async function handleCreate(values: { name: string; price: number; sku?: string }) {
    setSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const json = (await response.json()) as ApiResponse<Product>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur création');
      }
      toast.success('Produit créé');
      setCreateOpen(false);
      await fetchProducts();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit(values: { name: string; price: number; sku?: string }) {
    if (!editTarget) return;
    setSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch(`/api/products/${editTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const json = (await response.json()) as ApiResponse<Product>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur mise à jour');
      }
      toast.success('Produit mis à jour');
      setEditTarget(null);
      await fetchProducts();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/products/${deleteTarget.id}`, {
        method: 'DELETE'
      });
      const json = (await response.json()) as ApiResponse<Product>;
      if (!response.ok || json.error) {
        throw new Error(json.error?.message ?? 'Erreur suppression');
      }
      toast.success('Produit supprimé');
      setDeleteTarget(null);
      await fetchProducts();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-500">Gestion CRUD via /api/products</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Ajouter</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Rechercher par nom ou SKU"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead className="hidden sm:table-cell">SKU</TableHead>
              <TableHead className="hidden md:table-cell">Créé</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm">
                  Aucun produit trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.sku ?? '—'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.price.toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditTarget(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductDialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          setFormError(null);
        }}
        title="Ajouter un produit"
        description="Créez un nouveau produit."
        submitLabel="Créer"
        onSubmit={handleCreate}
        isSubmitting={submitting}
        error={formError}
      />

      <ProductDialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
          setFormError(null);
        }}
        title="Modifier le produit"
        description="Mettez à jour les informations."
        submitLabel="Enregistrer"
        initialValues={
          editTarget
            ? {
                name: editTarget.name,
                price: editTarget.price,
                sku: editTarget.sku ?? ''
              }
            : undefined
        }
        onSubmit={handleEdit}
        isSubmitting={submitting}
        error={formError}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Supprimer le produit"
        description={
          deleteTarget
            ? `Supprimer ${deleteTarget.name} définitivement ?`
            : undefined
        }
        confirmLabel="Supprimer"
        onConfirm={() => void handleDelete()}
        isSubmitting={submitting}
      />
    </section>
  );
}
