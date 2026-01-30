import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';

export async function POST() {
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return fail(apiError('EMPTY_CART', 'Panier vide'), 400);
    }

    const itemsData = cartItems.map((item) => {
      const unitPrice = item.product?.price ?? 0;
      const lineTotal = unitPrice * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        lineTotal
      };
    });

    const total = itemsData.reduce((sum, item) => sum + item.lineTotal, 0);

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          total,
          items: {
            create: itemsData
          }
        },
        include: { items: { include: { product: true } } }
      }),
      prisma.cartItem.deleteMany()
    ]);

    return ok(transaction, { status: 201 });
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
