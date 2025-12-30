import AlertProvider from './alert-provider';
import AuthProvider from './auth-provider';
import ModalProvider from './modal-provider';
import { QueryProvider } from './query-provider';
import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <ModalProvider>
          <AlertProvider>
            <QueryProvider>{children}</QueryProvider>
          </AlertProvider>
        </ModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
