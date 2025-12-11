import SolutionFilter from './components/solution-filter';
import SolutionList from './components/solution-list';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div className="flex gap-[50px] h-[calc(100vh-90px)]">
      <div className="w-[325px] shrink-0 overflow-y-auto">
        <Suspense>
          <SolutionFilter />
        </Suspense>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Suspense>
          <SolutionList />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
