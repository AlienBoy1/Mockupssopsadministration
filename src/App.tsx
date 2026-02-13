import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner@2.0.3';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider } from './contexts/AuthContext';
import { ConnectionProvider } from './contexts/ConnectionContext';

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <ConnectionProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" theme="dark" />
        </ConnectionProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
