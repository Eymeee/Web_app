import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';
import { productUpdateSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

function getClientKey() {
  const forwardedFor = headers().get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'local';
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });
    if (!product) {
      return fail(apiError('NOT_FOUND', 'Produit introuvable'), 404);
    }
    return ok(product);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const rate = checkRateLimit(`products:put:${getClientKey()}`);
  if (!rate.ok) {
    return fail(apiError('RATE_LIMIT', 'Trop de requêtes'), 429);
  }

  try {
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return fail(
        apiError(
          'VALIDATION_ERROR',
          'Mise à jour invalide',
          parsed.error.flatten()
        ),
        400
      );
    }

    const existing = await prisma.product.findUnique({
      where: { id: params.id }
    });
    if (!existing) {
      return fail(apiError('NOT_FOUND', 'Produit introuvable'), 404);
    }

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: parsed.data
    });
    return ok(updated);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const rate = checkRateLimit(`products:delete:${getClientKey()}`);
  if (!rate.ok) {
    return fail(apiError('RATE_LIMIT', 'Trop de requêtes'), 429);
  }

  try {
    const existing = await prisma.product.findUnique({
      where: { id: params.id }
    });
    if (!existing) {
      return fail(apiError('NOT_FOUND', 'Produit introuvable'), 404);
    }

    const removed = await prisma.product.delete({
      where: { id: params.id }
    });
    return ok(removed);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
