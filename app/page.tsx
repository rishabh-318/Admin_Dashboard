'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './login/page';

export default function Home() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push('/dashboard');
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;
  return <LoginPage />;
}
