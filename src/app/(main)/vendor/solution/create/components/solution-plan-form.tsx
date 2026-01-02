'use client';

import PlanInput from './plan-input';
import { useFormContext } from 'react-hook-form';
import { ISolutionFormData } from './solution-form';

const SolutionPlanForm = () => {
  const { watch, setValue } = useFormContext<ISolutionFormData>();
  const plans = watch('plans');

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">
      <h2 className="mb-8 text-xl font-bold">솔루션 플랜 정보 입력</h2>
      <PlanInput plans={plans || []} onChange={(newPlans) => setValue('plans', newPlans)} />
    </section>
  );
};

export default SolutionPlanForm;
