'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        className: 'border border-slate-200 bg-white text-slate-900'
      }}
    />
  );
}
