import { ISolutionListItem } from '@/types/solution';
import Image from 'next/image';
import Link from 'next/link';

interface ISolutionListItemProps {
  solution: ISolutionListItem;
}

const SolutionListItem = ({ solution }: ISolutionListItemProps) => {
  const { solutionSeq, representImageUrl, solutionName, amount, averageStar, countSolutionReview, vendorName } =
    solution;

  return (
    <Link href={`/solutions/${solutionSeq}`} className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#D9D9D9]">
        {representImageUrl && <Image src={representImageUrl} alt={solutionName} fill className="object-cover" />}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{solutionName}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">
          {amount.toLocaleString()}원~
          <span className="text-sm font-normal text-gray-500">
            /월<span className="text-[#7A7A7A]">(VAT 별도)</span>
          </span>
        </p>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
          <span>★</span>
          <span>
            {averageStar}({countSolutionReview})
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{vendorName}</p>
      </div>
    </Link>
  );
};

export default SolutionListItem;
