'use client';

import { Button } from '@/components/ui/button';
import { ProductThumb } from '@/components/product-thumb';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  sku?: string | null;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: CartProduct | null;
};

type CartListProps = {
  items: CartItem[];
  onUpdate: (id: string, quantity: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSubmitting?: boolean;
};

export function CartList({ items, onUpdate, onDelete, isSubmitting }: CartListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        Panier vide.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead className="hidden sm:table-cell">Prix</TableHead>
            <TableHead className="w-32">Quantité</TableHead>
            <TableHead className="text-right">Total ligne</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const price = item.product?.price ?? 0;
            const line = price * item.quantity;
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ProductThumb name={item.product?.name ?? '—'} size="sm" />
                    <div>
                      <div className="font-medium">{item.product?.name ?? '—'}</div>
                      {item.product?.sku && (
                        <p className="text-xs text-slate-500">{item.product.sku}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{price.toFixed(2)} €</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    aria-label={`Quantity for ${item.product?.name ?? 'product'}`}
                    disabled={isSubmitting}
                    onChange={(event) => {
                      event.currentTarget.dataset.qty = event.target.value;
                    }}
                    onBlur={(event) => {
                      const value = Number.parseInt(
                        event.currentTarget.dataset.qty ?? event.currentTarget.value,
                        10
                      );
                      const qty = Number.isNaN(value) || value < 1 ? item.quantity : value;
                      void onUpdate(item.id, qty);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.currentTarget.blur();
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-right font-medium">{line.toFixed(2)} €</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={() => void onDelete(item.id)}
                    aria-label={`Remove ${item.product?.name ?? 'product'} from cart`}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
