'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main className={`container mx-auto px-4 ${!isLoginPage ? 'mt-4' : ''}`}>
        {children}
      </main>
    </>
  );
} 