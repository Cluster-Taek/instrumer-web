'use client';

import ServicePlansSection from './components/service-plans-section';
import { useSolution } from '@/lib/solution';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const solutionSeq = Number(params.id);

  const { data, isLoading, error } = useSolution(solutionSeq);
  const solution = data?.data;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">솔루션 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error || !solution) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">솔루션을 찾을 수 없습니다</h1>
          <p className="text-gray-500">잘못된 접근이거나 삭제된 솔루션입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-20 py-12 w-full">
      {/* TODO: 히어로 섹션 추가 예정 */}

      {/* 서비스 플랜 섹션 */}
      {solution.plans && solution.plans.length > 0 && <ServicePlansSection solution={solution} />}

      {/* TODO: 리뷰 섹션 추가 예정 */}
    </div>
  );
};

export default Page;
