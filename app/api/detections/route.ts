import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';

const detectionSchema = z.object({
  label: z.string().min(1, 'label requis'),
  quantity: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? value : parsed;
    }
    return value;
  }, z.number().int().min(1).optional())
});

async function getCart() {
  const items = await prisma.cartItem.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  });
  const total = items.reduce((sum, item) => {
    return sum + item.quantity * (item.product?.price ?? 0);
  }, 0);
  return { items, total };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = detectionSchema.safeParse(body);
    if (!parsed.success) {
      return fail(
        apiError('VALIDATION_ERROR', 'Payload invalide', parsed.error.flatten()),
        400
      );
    }

    const label = parsed.data.label.trim();
    const quantity = parsed.data.quantity ?? 1;

    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { name: { equals: label } },
          { sku: { equals: label } }
        ]
      }
    });

    if (!product) {
      return fail(
        apiError('PRODUCT_UNKNOWN', `Produit inconnu: ${label}`),
        400
      );
    }

    const existing = await prisma.cartItem.findFirst({
      where: { productId: product.id }
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId: product.id,
          quantity
        }
      });
    }

    const cart = await getCart();
    return ok(cart, { status: 201 });
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
