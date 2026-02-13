import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './layout/Sidebar';
import ConnectionBanner from './layout/ConnectionBanner';

export default function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#080C14]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ConnectionBanner />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
