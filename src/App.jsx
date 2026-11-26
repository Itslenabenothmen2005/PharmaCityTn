import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { ToastProvider } from './hooks/useToast';
import { UserStoreProvider } from './hooks/useUserStore';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <UserStoreProvider>
          <RouterProvider router={router} />
        </UserStoreProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
