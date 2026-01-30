import { describe, it, expect } from 'vitest';
import { computeCartTotal } from '../lib/cart-helpers';

describe('computeCartTotal', () => {
  it('somme prix * quantité', () => {
    const total = computeCartTotal([
      { quantity: 2, product: { price: 3 } },
      { quantity: 1, product: { price: 4.5 } }
    ]);
    expect(total).toBeCloseTo(10.5);
  });

  it('ignore produits null', () => {
    const total = computeCartTotal([
      { quantity: 2, product: null },
      { quantity: 1, product: { price: 4 } }
    ]);
    expect(total).toBe(4);
  });
});
