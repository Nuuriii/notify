'use client';
import { ReactNode } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/redux-toolkit/store';
import { useQuery } from '@tanstack/react-query';
import styles from './loader.module.css';

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
  const { isPending, isError, data } = useQuery({
    queryKey: [`${userInformaion.displayName}`, `${userInformaion.photoUrl}`],
    queryFn: async () => {
      try {
        const { data: verify } = await axios.get(
          `/api/auth/verify?display-name=${userInformaion.displayName}&photo-url=${userInformaion.photoUrl}`,
        );
        setIsAuth(true);
        router.push('/note');
        return verify;
      } catch (error: any) {
        setIsAuth(false);
        router.push('/');
        return error;
      }
    },
  });

  console.log(isAuth, pathName);

  const RenderingCondition = () => {
    if (isPending) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className={styles.loader}></div>
        </div>
      );
    } else {
      return children;
    }
  };

  return <>{RenderingCondition()}</>;
}
