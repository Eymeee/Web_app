export type PricedItem = {
  quantity: number;
  product: { price: number } | null;
};

export function computeCartTotal(items: PricedItem[]) {
  return items.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
}

export type CartEntry = {
  id: string;
  productId: string;
  quantity: number;
};

export function addOrIncrement(
  entries: CartEntry[],
  productId: string,
  quantity: number
) {
  const existing = entries.find((entry) => entry.productId === productId);
  if (existing) {
    return entries.map((entry) =>
      entry.productId === productId
        ? { ...entry, quantity: entry.quantity + quantity }
        : entry
    );
  }
  return [...entries, { id: `tmp-${entries.length + 1}`, productId, quantity }];
}
