'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productCreateSchema } from '@/lib/validation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const productFormSchema = productCreateSchema;

export type ProductFormValues = z.infer<typeof productFormSchema>;

type ProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  submitLabel: string;
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
};

export function ProductDialog({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  initialValues,
  onSubmit,
  isSubmitting,
  error
}: ProductDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      sku: ''
    }
  });

  React.useEffect(() => {
    if (open) {
      reset({
        name: initialValues?.name ?? '',
        price: initialValues?.price ?? 0,
        sku: initialValues?.sku ?? ''
      });
    }
  }, [open, initialValues, reset]);

  async function onValid(values: ProductFormValues) {
    const payload: ProductFormValues = {
      name: values.name.trim(),
      price: values.price,
      sku: values.sku?.trim() || undefined
    };
    await onSubmit(payload);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <form
          onSubmit={(event) => {
            void handleSubmit(onValid)(event);
          }}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Produit" {...register('name')} />
            {errors.name && (
              <p className="text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min={0}
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-xs text-rose-600">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="SKU" {...register('sku')} />
            {errors.sku && (
              <p className="text-xs text-rose-600">{errors.sku.message}</p>
            )}
          </div>
          {error ? (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
