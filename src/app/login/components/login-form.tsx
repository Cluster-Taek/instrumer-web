'use client';

import { useSearchParams } from '@/hooks/use-search-params';
import { ILoginFormValue } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { searchParams } = useSearchParams();
  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
  } = useForm<ILoginFormValue>({
    defaultValues: {
      login: 'startwith0325@gmail.com',
      password: '12345678!',
    },
  });

  const serverError = formState.errors?.root?.serverError?.message;
  const validationError = formState.errors.email?.message || formState.errors.password?.message;

  const handleSubmit = formHandleSubmit(async (data) => {
    await signIn('login-credentials', { ...data, callbackUrl: searchParams['callbackUrl'] ?? '/' });
  });

  return (
    <div className="flex items-center justify-center bg-ui-bg-subtle min-h-dvh w-dvw">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" {...control.register('login')} />
        <input type="password" placeholder="Password" {...control.register('password')} />
        <button type="submit">Login</button>
      </form>
      {serverError && <div className="text-red-500">{serverError}</div>}
      {validationError && <div className="text-red-500">{validationError}</div>}
    </div>
  );
};

export default LoginForm;
