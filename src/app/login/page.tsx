import LoginForm from './components/login-form';
import { Suspense } from 'react';

export default function Login() {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
