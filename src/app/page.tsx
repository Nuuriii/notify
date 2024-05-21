import Image from 'next/image';
import Login from '@/components/signIn/SignIn';
import ProtectedRoute from '@/components/protectedRoute/protectedRoute';

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    </main>
  );
}
