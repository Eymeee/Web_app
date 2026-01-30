import { z } from 'zod';

const priceSchema = z.preprocess((value) => {
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
}, z.number().positive());

export const productCreateSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  price: priceSchema,
  sku: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() === '') return undefined;
    return value;
  }, z.string().min(2).max(32).optional())
});

export const productUpdateSchema = productCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, 'Aucun champ à mettre à jour');

export const cartItemAddSchema = z.object({
  productId: z.string().min(1),
  quantity: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? value : parsed;
    }
    return value;
  }, z.number().int().min(1))
});

export const cartItemUpdateSchema = z.object({
  quantity: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? value : parsed;
    }
    return value;
  }, z.number().int().min(1))
});

export const detectionPayloadSchema = z.object({
  type: z.enum(['scan', 'kiosk', 'manual']),
  payload: z.record(z.string(), z.any()).optional()
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type CartItemAddInput = z.infer<typeof cartItemAddSchema>;
export type CartItemUpdateInput = z.infer<typeof cartItemUpdateSchema>;
export type DetectionPayloadInput = z.infer<typeof detectionPayloadSchema>;
