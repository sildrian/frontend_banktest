'use client';
import { FaGoogle, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { decodeToken } from '@/utils/jwt';
import { getTokenC, removeTokenC } from '@/utils/authclients';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenC();
      if (token) {
        const decodedToken = decodeToken(token);
        setUser(decodedToken);
      }
    };
    fetchToken();
  }, []);

  const signOut = async () => {
    await removeTokenC();
    setUser(null);
    router.push('/login');
  };

  const signIn = async () => {
    // await signIn('google');
    router.push('/login');
  };  

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/img/superbank.png"
              alt="Google"
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user?.username}</span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaUser className="mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaGoogle className="mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}