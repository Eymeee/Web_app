import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';
import { cartItemUpdateSchema } from '@/lib/validation';

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const parsed = cartItemUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return fail(
        apiError('VALIDATION_ERROR', 'Article invalide', parsed.error.flatten()),
        400
      );
    }

    const existing = await prisma.cartItem.findUnique({
      where: { id: params.id }
    });
    if (!existing) {
      return fail(apiError('NOT_FOUND', 'Article introuvable'), 404);
    }

    await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity: parsed.data.quantity }
    });

    const cart = await getCart();
    return ok(cart);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existing = await prisma.cartItem.findUnique({
      where: { id: params.id }
    });
    if (!existing) {
      return fail(apiError('NOT_FOUND', 'Article introuvable'), 404);
    }

    await prisma.cartItem.delete({ where: { id: params.id } });
    const cart = await getCart();
    return ok(cart);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
