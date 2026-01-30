import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';

const idSchema = z.object({ id: z.string().min(1) });

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const parsed = idSchema.safeParse(params);
  if (!parsed.success) {
    return fail(
      apiError('VALIDATION_ERROR', 'Paramètre id invalide', parsed.error.flatten()),
      400
    );
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parsed.data.id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!transaction) {
      return fail(apiError('NOT_FOUND', 'Transaction introuvable'), 404);
    }

    return ok(transaction);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
