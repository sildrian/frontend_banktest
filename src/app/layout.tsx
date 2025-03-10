import './globals.css';
import { Inter } from 'next/font/google';
import NavbarWrapper from '@/components/NavbarWrapper';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Customer Management System',
  description: 'A Customer Management System built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
      </body>
    </html>
  );
} 