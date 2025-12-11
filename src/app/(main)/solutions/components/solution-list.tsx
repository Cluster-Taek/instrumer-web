'use client';

import SolutionListItem from './solution-list-item';
import SolutionListSkeleton from './solution-list-skeleton';
import { SimplePagination } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useSearchParams } from '@/hooks/use-search-params';
import { useSolutions } from '@/lib/solution';

const SolutionList = () => {
  const { searchParams } = useSearchParams();
  const { currentPage, start, end, setPage } = usePagination({ pageSize: 20 });

  const { data, isLoading } = useSolutions({ start, end, ...searchParams });
  const solutions = data?.data ?? [];
  const totalPages = 5; // TODO: API에서 total count 받아서 계산

  if (isLoading) {
    return <SolutionListSkeleton />;
  }

  return (
    <div className="w-full">
      <p className="mb-4 font-semibold">
        <span className="text-primary">{solutions.length}</span>개의 솔루션
      </p>
      <div className="grid grid-cols-4 gap-6">
        {solutions.map((solution) => (
          <SolutionListItem key={solution.solutionSeq} solution={solution} />
        ))}
      </div>
      <SimplePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-8" />
    </div>
  );
};

export default SolutionList;
