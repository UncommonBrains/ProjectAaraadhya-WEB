import { ToastInitializer } from './components/common/Toast/Toast';
import { AuthProvider } from './context/common/AuthContext/AuthContext';
import { ToastProvider } from './context/common/ToastContext/ToastContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ToastInitializer />
        <AppRouter />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
