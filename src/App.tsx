import { ToastInitializer } from './components/common/Toast/Toast';
import { AuthProvider } from './context/common/AuthContext/AuthContext';
import { ConfirmationDialogProvider } from './context/common/ConfirmationDialogContext/ConfirmationDialogContext';
import { ToastProvider } from './context/common/ToastContext/ToastContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ToastProvider>
      <ConfirmationDialogProvider>
        <AuthProvider>
          <ToastInitializer />
          <AppRouter />
        </AuthProvider>
      </ConfirmationDialogProvider>
    </ToastProvider>
  );
}

export default App;
