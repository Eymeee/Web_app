import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';
import { cartItemAddSchema } from '@/lib/validation';

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

export async function GET() {
  try {
    const cart = await getCart();
    return ok(cart);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cartItemAddSchema.safeParse(body);
    if (!parsed.success) {
      return fail(
        apiError('VALIDATION_ERROR', 'Article invalide', parsed.error.flatten()),
        400
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: parsed.data.productId }
    });
    if (!product) {
      return fail(apiError('NOT_FOUND', 'Produit introuvable'), 404);
    }

    const existing = await prisma.cartItem.findFirst({
      where: { productId: parsed.data.productId }
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + parsed.data.quantity }
      });
    } else {
      await prisma.cartItem.create({ data: parsed.data });
    }

    const cart = await getCart();
    return ok(cart, { status: 201 });
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
