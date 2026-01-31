'use client';

import * as React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export function KioskClient() {
  const [url, setUrl] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin);
    }
  }, []);

  const handleFullscreen = React.useCallback(() => {
    const element = containerRef.current;
    if (!element) return;
    const isFs = document.fullscreenElement !== null;
    if (isFs) {
      void document.exitFullscreen();
      return;
    }
    void element.requestFullscreen().catch(() => {
      toast.error('Impossible de passer en plein écran');
    });
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.origin);
      toast.success('Lien copié');
    } catch (error) {
      toast.error("Copie impossible");
    }
  }, [url]);

  return (
    <div className="space-y-8" ref={containerRef}>
      <PageHeader
        title="Kiosk Mode"
        description="Scan the QR code to access the app on mobile devices, or use fullscreen mode for display"
      />

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Scan to Access
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Use your mobile device camera to scan the QR code below
          </p>
          <div className="flex justify-center">
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 shadow-inner">
              {url ? (
                <QRCodeCanvas
                  value={url}
                  size={280}
                  includeMargin
                  className="h-70 w-70"
                  level="M"
                />
              ) : (
                <div className="flex h-70 w-70 items-center justify-center text-sm text-slate-400">
                  Loading...
                </div>
              )}
            </div>
          </div>
          <p className="mt-6 break-all font-mono text-xs text-slate-400">{url}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={handleFullscreen} className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            Toggle Fullscreen
          </Button>
          <Button size="lg" variant="outline" onClick={handleCopy} className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy Link
          </Button>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Innovation Feature
          </h3>
          <p className="text-sm leading-relaxed text-blue-800">
            Kiosk mode provides QR code access for mobile devices and fullscreen
            display capabilities. This enables self-service scenarios and
            public-facing displays for your Smart Grocery Box system.
          </p>
        </div>
      </div>
    </div>
  );
}
