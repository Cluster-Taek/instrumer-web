'use client';

import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface IFilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: IFilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronUp className={cn('h-5 w-5 text-gray-400 transition-transform', !isOpen && 'rotate-180')} />
      </button>
      {isOpen && children}
    </div>
  );
};

export default FilterSection;
