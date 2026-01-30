import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/api';
import { apiError } from '@/lib/errors';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return ok(transactions);
  } catch (error) {
    return fail(apiError('UNEXPECTED', 'Erreur serveur', error), 500);
  }
}
