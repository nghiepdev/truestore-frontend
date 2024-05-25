'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {Toaster} from 'sonner';

import {Fbpixel} from '@tracking/fbpixel';
import backdrop, {Backdropper} from '@ui/backdrop';
import offcanvas, {Offcanvaser} from '@ui/offcanvas';

export default function Provider({children}: React.PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    backdrop.close();
    offcanvas.close();
  }, [pathname]);

  return (
    <>
      {children}
      <Offcanvaser />
      <Backdropper />
      <Toaster richColors position='top-center' />
      <Fbpixel />
    </>
  );
}
