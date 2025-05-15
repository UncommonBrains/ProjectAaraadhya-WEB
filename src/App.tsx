import { ToastInitializer } from './components/common/Toast/Toast';
import { AuthProvider } from './context/common/AuthContext/AuthContext';
import { CartProvider } from './context/common/CartContext/CartContext';
import { ConfirmationDialogProvider } from './context/common/ConfirmationDialogContext/ConfirmationDialogContext';
import { ToastProvider } from './context/common/ToastContext/ToastContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ToastProvider>
      <ConfirmationDialogProvider>
        <AuthProvider>
          <CartProvider>
            <ToastInitializer />
            <AppRouter />
          </CartProvider>
        </AuthProvider>
      </ConfirmationDialogProvider>
    </ToastProvider>
  );
}

export default App;
