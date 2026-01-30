'use client';

import * as React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-6" ref={containerRef}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-500">Scannez pour ouvrir l’app sur mobile</p>
        <div className="mt-4 flex justify-center">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-inner">
            {url ? (
              <QRCodeCanvas value={url} size={240} includeMargin className="h-60 w-60" />
            ) : (
              <div className="flex h-60 w-60 items-center justify-center text-sm text-slate-400">
                ...
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">{url}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={handleFullscreen}>Plein écran</Button>
        <Button variant="outline" onClick={handleCopy}>
          Copier le lien
        </Button>
      </div>
    </div>
  );
}
