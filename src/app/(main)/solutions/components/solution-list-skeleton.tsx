const SolutionListItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-3">
      <div className="aspect-[4/3] w-full rounded-[10px] bg-gray-200" />
      <div>
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="mt-2 h-6 w-1/2 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-1/4 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
};

const SolutionListSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mb-4 h-5 w-24 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SolutionListItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default SolutionListSkeleton;
