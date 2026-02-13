import { Outlet } from 'react-router';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { ConnectionBanner } from '../ConnectionBanner';
import { useState } from 'react';

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <ConnectionBanner />
        
        <main id="main-content" className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
