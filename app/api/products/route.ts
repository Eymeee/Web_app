import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';
import { productCreateSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

function getClientKey() {
  const forwardedFor = headers().get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'local';
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return ok(products);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}

export async function POST(request: Request) {
  const rate = checkRateLimit(`products:post:${getClientKey()}`);
  if (!rate.ok) {
    return fail(apiError('RATE_LIMIT', 'Trop de requêtes'), 429);
  }

  try {
    const body = await request.json();
    const parsed = productCreateSchema.safeParse(body);
    if (!parsed.success) {
      return fail(
        apiError('VALIDATION_ERROR', 'Produit invalide', parsed.error.flatten()),
        400
      );
    }

    const created = await prisma.product.create({ data: parsed.data });
    return ok(created, { status: 201 });
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
