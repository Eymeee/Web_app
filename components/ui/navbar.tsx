'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/kiosk', label: 'Kiosk' }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="glass-nav sticky top-0 z-50 shadow-sm">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900 transition-colors hover:text-blue-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="hidden sm:inline">SMART GROCERY</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'rounded-lg px-4 py-2 text-sm font-semibold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'rounded-lg px-4 py-2 text-sm font-medium transition-all text-slate-700 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm'
              }
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          className="border-t border-white/20 bg-white/80 px-4 py-3 backdrop-blur-md md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  isActive(item.href)
                    ? 'rounded-lg px-4 py-3 text-sm font-semibold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'rounded-lg px-4 py-3 text-sm font-medium transition-all text-slate-700 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm'
                }
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
