'use client';

import { useSolution } from '@/lib/solution';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const solutionSeq = Number(params.id);

  const { data, isLoading } = useSolution(solutionSeq);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <pre className="whitespace-pre-wrap break-all text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default Page;
