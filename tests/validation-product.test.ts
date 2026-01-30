import { describe, it, expect } from 'vitest';
import { productCreateSchema } from '../lib/validation';

describe('productCreateSchema', () => {
  it('rejette un prix négatif', () => {
    const result = productCreateSchema.safeParse({
      name: 'Test',
      price: -1,
      sku: 'SKU1'
    });
    expect(result.success).toBe(false);
  });

  it('accepte un produit valide', () => {
    const result = productCreateSchema.safeParse({
      name: 'Valid',
      price: 2.5,
      sku: 'SKU2'
    });
    expect(result.success).toBe(true);
  });
});
