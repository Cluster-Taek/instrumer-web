'use client';

import { BUDGET_OPTIONS, CATEGORY_OPTIONS, FILTER_CONFIG } from '@/constants/solution-constants';
import { FilterValues } from '@/hooks/use-solution-filter';
import { FilterKey } from '@/types';

interface IAppliedFiltersProps {
  appliedFilters: FilterValues;
  onRemove: (key: FilterKey, value?: string) => void;
}

const OPTIONS_MAP: Record<FilterKey, { value: string; label: string }[]> = {
  category: CATEGORY_OPTIONS,
  budget: BUDGET_OPTIONS,
};

const getLabel = (key: FilterKey, value: string): string => {
  const option = OPTIONS_MAP[key]?.find((opt) => opt.value === value);
  return option?.label ?? value;
};

const AppliedFilters = ({ appliedFilters, onRemove }: IAppliedFiltersProps) => {
  const activeFilters = Object.entries(appliedFilters).flatMap(([key, values]) => {
    const config = FILTER_CONFIG[key as FilterKey];
    return values
      .filter((v) => v !== config.defaultValue)
      .map((value) => ({ key: key as FilterKey, value, label: getLabel(key as FilterKey, value) }));
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold text-gray-900">적용된 필터</h3>
      <div className="flex flex-col gap-4">
        {activeFilters.map(({ key, value, label }) => (
          <button
            key={`${key}-${value}`}
            type="button"
            onClick={() => onRemove(key, FILTER_CONFIG[key].multiple ? value : undefined)}
            className="flex items-center justify-center rounded-[7px] border bg-[#E1DBFF] px-4 py-3 text-base text-gray-900"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppliedFilters;
