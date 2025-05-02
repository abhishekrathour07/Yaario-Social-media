import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Home, Bell, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LeftSidebar from '../LeftSidebar/LeftSidebar';

const Navbar = () => {
  return (
    <nav className='h-16 fixed border-b bg-slate-800 w-full top-0 z-50'>
      <div className='flex items-center justify-between h-full px-4 max-w-7xl mx-auto'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Image src="/logo.png" alt="Yaario" width={32} height={32} className='rounded-lg object-center' />
          <span className='text-white font-bold text-xl'>Yaario</span>
        </div>

        <div className='flex items-center gap-8'>
          <Link href="/home" className='text-white'>
            <Home className='w-6 h-6' />
          </Link>
          <Link href="/notifications" className='text-white'>
            <Bell className='w-6 h-6' />
          </Link>

          <Sheet>
            <SheetTrigger className='text-white'>
              <Menu className='w-6 h-6 text-white cursor-pointer' />
            </SheetTrigger>
            <SheetContent side="right" >
              <SheetTitle className='hidden'></SheetTitle>
              <LeftSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
