import Link from 'next/link';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        illustrationSrc="/illustrations/empty-404.svg"
        action={
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        }
      />
    </div>
  );
}
