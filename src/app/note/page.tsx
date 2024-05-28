import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import NotePage from '@/components/notePage/notePage';

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <NotePage />
      </ProtectedRoute>
    </main>
  );
}
