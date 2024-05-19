import Image from 'next/image';

import logoImg from '@/images/logo.webp';

import Footer from './footer';
import MenuOffcanvas from './menu-offcanvas';

export default function DefaultLayout({children}: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='container'>
        <header className='relative flex items-center justify-center gap-x-10 py-4'>
          <MenuOffcanvas />
          <a href='/'>
            <Image src={logoImg} unoptimized height={65} alt='' />
          </a>
        </header>
        <div>{children}</div>
      </div>
      <div className='h-10 lg:h-16'></div>
      <Footer className='mt-auto' />
    </div>
  );
}
