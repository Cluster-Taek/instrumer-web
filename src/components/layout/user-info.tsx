'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSuspenseUserInfo } from '@/lib/user';

export const UserInfoSkeleton = () => (
  <>
    <div className="size-8 animate-pulse rounded-full bg-gray-200" />
    <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
  </>
);

const UserInfo = () => {
  const { data: userData } = useSuspenseUserInfo();
  const user = userData?.data;

  return (
    <>
      <Avatar className="size-8">
        <AvatarImage src={user?.profileImageUrl} alt="프로필" />
        <AvatarFallback className="bg-gray-200 text-gray-500">{user?.businessName?.charAt(0) || 'U'}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-gray-700">{user?.businessName}</span>
    </>
  );
};

export default UserInfo;
