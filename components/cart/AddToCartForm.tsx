'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cartItemAddSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const addSchema = cartItemAddSchema;

export type AddFormValues = {
  productId: string;
  quantity: number;
};

type ProductOption = {
  id: string;
  name: string;
};

type AddToCartFormProps = {
  products: ProductOption[];
  onSubmit: (values: AddFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

export function AddToCartForm({ products, onSubmit, isSubmitting }: AddToCartFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddFormValues>({
    resolver: zodResolver(addSchema),
    defaultValues: { productId: products[0]?.id ?? '', quantity: 1 }
  });

  React.useEffect(() => {
    reset((current) => ({ ...current, productId: products[0]?.id ?? '' }));
  }, [products, reset]);

  async function onValid(values: AddFormValues) {
    await onSubmit(values);
    reset({ productId: products[0]?.id ?? '', quantity: 1 });
  }

  return (
    <form
      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
      onSubmit={(event) => {
        void handleSubmit(onValid)(event);
      }}
    >
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-slate-700">Produit</label>
        <select
          className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          {...register('productId')}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {errors.productId ? (
          <p className="text-xs text-rose-600">{errors.productId.message}</p>
        ) : null}
      </div>
      <div className="w-full sm:w-28">
        <label className="text-sm font-medium text-slate-700">Quantité</label>
        <Input type="number" min={1} {...register('quantity', { valueAsNumber: true })} />
        {errors.quantity ? (
          <p className="text-xs text-rose-600">{errors.quantity.message}</p>
        ) : null}
      </div>
      <Button type="submit" className="sm:w-36" disabled={isSubmitting}>
        Ajouter
      </Button>
    </form>
  );
}
