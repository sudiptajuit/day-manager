'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🎯 Day Manager
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm opacity-80">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 py-3 flex flex-col gap-2">
          {user && (
            <>
              <p className="text-sm opacity-80">{user.email}</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition text-left"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
