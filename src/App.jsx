import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { ToastProvider } from './hooks/useToast';
import { UserStoreProvider } from './hooks/useUserStore';

function App() {
  return (
    <ToastProvider>
      <UserStoreProvider>
        <RouterProvider router={router} />
      </UserStoreProvider>
    </ToastProvider>
  );
}

export default App;
