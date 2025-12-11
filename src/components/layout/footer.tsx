import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="border-b border-gray-800 px-24 py-16">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">인스트루머 사업자 정보</h3>
            <div className="flex flex-col gap-1 text-sm text-[#7A7A7A]">
              <p>상호명 : 인스트루머</p>
              <p>대표자명 : 정범준</p>
              <p>사업자등록번호 : 352-12-02256</p>
              <p>유선전화번호 : 010-6409-8268</p>
              <p>Email : startwith0325@gmail.com</p>
              <p>사업장 주소 : 서울특별시 성북구 124, 유담관 16층 B-1(정릉동,서경대학교)</p>
            </div>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="flex p-[10px] items-center justify-center rounded-[10px] bg-[#4D4D4D]">
                <FaLinkedinIn size={32} color="black" />
              </Link>
              <Link href="#" className="flex p-[10px] items-center justify-center rounded-[10px] bg-[#4D4D4D]">
                <FaInstagram size={32} color="black" />
              </Link>
              <Link href="#" className="flex p-[10px] items-center justify-center rounded-[10px] bg-[#4D4D4D]">
                <FaYoutube size={32} color="black" />
              </Link>
            </div>
          </div>

          <div className="flex gap-32">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">법률</h3>
              <div className="flex flex-col gap-2 text-sm text-[#7A7A7A]">
                <Link href="#" className="hover:text-white">
                  이용약관
                </Link>
                <Link href="#" className="hover:text-white">
                  개인정보처리방침
                </Link>
                <Link href="#" className="hover:text-white">
                  운영정책
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">고객 지원</h3>
              <div className="flex flex-col gap-2 text-sm text-[#7A7A7A]">
                <Link href="#" className="hover:text-white">
                  이메일 문의
                </Link>
                <Link href="#" className="hover:text-white">
                  광고 제휴
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-24 py-6">
        <p className="text-sm text-gray-500">© 2025 Instrumer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
