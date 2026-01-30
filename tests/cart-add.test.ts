import { describe, it, expect } from 'vitest';
import { addOrIncrement, type CartEntry } from '../lib/cart-helpers';

describe('addOrIncrement', () => {
  it('ajoute un nouvel article si absent', () => {
    const items: CartEntry[] = [];
    const next = addOrIncrement(items, 'prod1', 2);
    expect(next).toHaveLength(1);
    expect(next[0].quantity).toBe(2);
  });

  it('incrémente la quantité si déjà présent', () => {
    const items: CartEntry[] = [
      { id: '1', productId: 'prod1', quantity: 1 }
    ];
    const next = addOrIncrement(items, 'prod1', 3);
    expect(next).toHaveLength(1);
    expect(next[0].quantity).toBe(4);
  });
});
