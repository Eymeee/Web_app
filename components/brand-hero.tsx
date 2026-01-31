import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function BrandHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-16 text-white shadow-2xl md:px-12 lg:px-16">
      {/* Existing grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='white' stroke-opacity='0.3' stroke-width='1'/%3E%3C/path%3E%3C/svg%3E")`
        }}
        aria-hidden
      />
      {/* Hero illustration - positioned on the right on larger screens */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block lg:w-64 xl:w-80">
        <Image
          src="/illustrations/hero-grocery.svg"
          alt=""
          width={320}
          height={192}
          className="h-auto w-full opacity-90"
          aria-hidden
          priority
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center lg:pr-64 lg:text-left xl:pr-80">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Smart Grocery Box
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-blue-100 md:text-xl">
          Streamline your grocery management with intelligent product cataloging,
          seamless cart operations, and comprehensive transaction tracking
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 shadow-xl hover:bg-blue-50"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
