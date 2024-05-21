'use client';
import { ReactNode } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/redux-toolkit/store';
import { useQuery } from '@tanstack/react-query';

interface ProtectedProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const userInformaion = useSelector(
    (state: RootState) => state.userInformation,
  );
  const publicRoute = pathName === '/';

  const VerifyUser = async () => {
    setIsLoading(true);
    try {
      const { data: verify } = await axios.get(
        `/api/auth/verify?display-name=${userInformaion.displayName}&photo-ul=${userInformaion.photoUrl}`,
      );
      console.log(verify);
      setIsAuth(true);
    } catch (error: any) {
      console.log(error.response.data);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    VerifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
