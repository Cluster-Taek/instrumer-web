'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const MainSectionInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = inputRef.current?.value.trim();
    if (keyword) {
      router.push(`/solutions?keyword=${keyword}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="relative w-full max-w-[1000px] pl-10 pr-2 py-2 flex items-center rounded-full shadow-[0px_0px_10px_0px_#0000001A]"
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="키워드를 검색해주세요."
          className="w-full text-black placeholder:text-black focus:outline-none"
        />
        <button
          type="submit"
          className="flex size-10 items-center justify-center rounded-full bg-black p-1 text-center text-white"
        >
          →
        </button>
      </form>
    </>
  );
};

export default MainSectionInput;
