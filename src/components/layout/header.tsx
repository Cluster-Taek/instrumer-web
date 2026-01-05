'use client';

import LoginModal from '../auth/login-modal';
import UserInfo, { UserInfoSkeleton } from './user-info';
import { Dropdown } from '@/components/ui/dropdown';
import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { useUser } from '@/lib/user';
import { ChevronDown } from '@medusajs/icons';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: userData } = useUser();
  const user = userData?.data;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <header className="w-full backdrop-blur-[2000px] shadow-[0px_5px_10px_0px_#0000001A] sticky top-0 z-10">
      <div className="flex items-center justify-between h-[90px] px-[100px]">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/images/logo.svg" alt="logo" width={154} height={42} />
          </Link>

          <Dropdown.Root>
            <Dropdown.Trigger className="flex items-center gap-2 text-lg text-gray-700 hover:text-gray-900 ">
              온라인 솔루션 탐색
              <ChevronDown className="w-4 h-4" />
            </Dropdown.Trigger>
            <Dropdown.Content align="start" sideOffset={8}>
              {CATEGORY_OPTIONS.map((category) => (
                <Dropdown.Item
                  key={category.value}
                  className="text-start whitespace-nowrap px-6 py-2 text-lg"
                  onSelect={() => router.push(`/solutions?category=${category.value}`)}
                >
                  {category.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>

        <div className="flex items-center gap-6">
          {status === 'loading' ? (
            <div className="flex items-center gap-3">
              <UserInfoSkeleton />
            </div>
          ) : session ? (
            <Dropdown.Root>
              <Dropdown.Trigger className="flex items-center gap-3">
                <Suspense fallback={<UserInfoSkeleton />}>
                  <UserInfo />
                </Suspense>
              </Dropdown.Trigger>
              <Dropdown.Content align="end" sideOffset={8}>
                {user?.userType === 'VENDOR' ? (
                  <Dropdown.Item onSelect={() => router.push('/vendor/solutions')}>솔루션 관리</Dropdown.Item>
                ) : (
                  <Dropdown.Item onSelect={() => router.push('/consumer/mypage')}>마이페이지</Dropdown.Item>
                )}
                <Dropdown.Item className="text-red-500 hover:text-red-700" onSelect={handleSignOut}>
                  로그아웃
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          ) : (
            <>
              <LoginModal />
              <Link href="/register" className="text-[18px] text-gray-700 hover:text-gray-900">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
