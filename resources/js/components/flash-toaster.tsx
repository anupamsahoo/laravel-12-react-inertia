'use client';

import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { type FlashProps } from '@/types';


export default function FlashToaster() {
  const { flash } = usePage<{ flash: FlashProps }>().props;
    const hasShown = useRef(false);

  useEffect(() => {
      if (!hasShown.current) {
          if (flash.success) {
              toast.success(flash.success, { duration: 2000 });
              hasShown.current = true;
          }

          if (flash.error) {
              toast.error(flash.error, { duration: 2000 });
              hasShown.current = true;
          }

          // Clear flash manually after 2s
          setTimeout(() => {
              const el = document?.querySelector('[data-page]');

              if (el) {
                  const page = JSON.parse(el.innerHTML);
                  page.props.flash = {};
                  el.innerHTML = JSON.stringify(page);
              }

              hasShown.current = false;
          }, 2000);
      }
  }, [flash]);

  return null;
}
