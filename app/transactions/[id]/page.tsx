import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TransactionDetailClient } from '@/components/transactions/TransactionDetailClient';

export default function TransactionDetailPage() {
  return (
    <div className="space-y-4">
      <Button asChild variant="outline" size="sm">
        <Link href="/transactions">Retour</Link>
      </Button>
      <TransactionDetailClient />
    </div>
  );
}
