import { ChevronDown } from '@medusajs/icons';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full backdrop-blur-[2000px] shadow-[0px_5px_10px_0px_#0000001A] sticky top-0 z-10">
      <div className="flex items-center justify-between h-[90px] px-[100px]">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/images/logo.svg" alt="logo" width={154} height={42} />
          </Link>

          <button className="flex items-center gap-1 text-[18px] text-gray-700 hover:text-gray-900">
            온라인 솔루션 탐색
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[18px] text-gray-700 hover:text-gray-900">
            로그인
          </Link>
          <Link href="/signup" className="text-[18px] text-gray-700 hover:text-gray-900">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
