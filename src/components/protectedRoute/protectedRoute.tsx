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
  const { isPending, isError, data, error } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const { data: verify } = await axios.get(
          `/api/auth/verify?display-name=${userInformaion.displayName}&photo-url=${userInformaion.photoUrl}`,
        );

        return verify;
      } catch (error: any) {
        return error;
      }
    },
  });

  console.log(data);

  return (
    <>
      {isPending ? (
        <div className="min-h-screen flex justify-center items-center">
          <div className={styles.loader}></div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
