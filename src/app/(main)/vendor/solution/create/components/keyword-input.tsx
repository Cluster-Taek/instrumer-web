'use client';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  maxKeywords?: number;
}

const KeywordInput = ({ keywords, onChange, maxKeywords = 10 }: KeywordInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    if (keywords.includes(trimmedValue)) {
      alert('이미 등록된 키워드입니다.');
      return;
    }
    if (keywords.length >= maxKeywords) {
      alert(`키워드는 최대 ${maxKeywords}개까지 등록할 수 있습니다.`);
      return;
    }

    onChange([...keywords, trimmedValue]);
    setInputValue('');
  };

  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    onChange(updatedKeywords);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="space-y-4">
      {/* 입력 필드 */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="키워드를 입력하세요 (Enter로 추가)"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAddKeyword}
          disabled={!inputValue.trim() || keywords.length >= maxKeywords}
        >
          <Plus className="mr-1 h-4 w-4" />
          추가
        </Button>
      </div>

      {/* 키워드 태그 목록 */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
            >
              #{keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(index)}
                className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 안내 문구 */}
      <p className="text-xs text-gray-500">
        {keywords.length}/{maxKeywords}개 등록됨
      </p>

      {keywords.length === 0 && (
        <p className="text-center text-sm text-gray-500">등록된 키워드가 없습니다.</p>
      )}
    </div>
  );
};

export default KeywordInput;
