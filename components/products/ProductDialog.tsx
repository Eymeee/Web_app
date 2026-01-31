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
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              autoComplete="off"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-error" className="text-sm font-medium text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">
              Price (€) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min={0}
              placeholder="0.00"
              aria-invalid={errors.price ? 'true' : 'false'}
              aria-describedby={errors.price ? 'price-error' : undefined}
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p id="price-error" className="text-sm font-medium text-red-600" role="alert">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU (Optional)</Label>
            <Input
              id="sku"
              placeholder="Product SKU code"
              autoComplete="off"
              aria-invalid={errors.sku ? 'true' : 'false'}
              aria-describedby={errors.sku ? 'sku-error' : undefined}
              {...register('sku')}
            />
            {errors.sku && (
              <p id="sku-error" className="text-sm font-medium text-red-600" role="alert">
                {errors.sku.message}
              </p>
            )}
          </div>
          {error ? (
            <div
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
