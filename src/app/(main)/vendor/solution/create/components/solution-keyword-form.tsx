'use client';

import KeywordInput from './keyword-input';
import { useFormContext } from 'react-hook-form';
import { ISolutionFormData } from './solution-form';

const SolutionKeywordForm = () => {
  const { watch, setValue } = useFormContext<ISolutionFormData>();
  const keywords = watch('keywords');

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">
      <h2 className="mb-8 text-xl font-bold">키워드 검색 태그</h2>
      <KeywordInput keywords={keywords || []} onChange={(newKeywords) => setValue('keywords', newKeywords)} />
    </section>
  );
};

export default SolutionKeywordForm;
