'use client';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ISolutionPlan, ISolutionPlanDetail } from '@/types/solution';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const PLAN_TYPE_OPTIONS = [
  { value: 'MONTHLY', label: '월간' },
  { value: 'YEARLY', label: '연간' },
  { value: 'ONE_TIME', label: '일회성' },
];

interface PlanInputProps {
  plans: ISolutionPlan[];
  onChange: (plans: ISolutionPlan[]) => void;
}

const PlanInput = ({ plans, onChange }: PlanInputProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAddPlan = () => {
    const newPlan: ISolutionPlan = {
      name: '',
      subName: '',
      price: 0,
      planType: 'MONTHLY',
      details: [],
    };
    onChange([...plans, newPlan]);
    setExpandedIndex(plans.length);
  };

  const handleRemovePlan = (index: number) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    onChange(updatedPlans);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handlePlanChange = (index: number, field: keyof ISolutionPlan, value: string | number) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    onChange(updatedPlans);
  };

  const handleAddDetail = (planIndex: number) => {
    const updatedPlans = [...plans];
    const currentDetails = updatedPlans[planIndex].details || [];
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      details: [...currentDetails, { name: '', context: '' }],
    };
    onChange(updatedPlans);
  };

  const handleRemoveDetail = (planIndex: number, detailIndex: number) => {
    const updatedPlans = [...plans];
    const currentDetails = updatedPlans[planIndex].details || [];
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      details: currentDetails.filter((_, i) => i !== detailIndex),
    };
    onChange(updatedPlans);
  };

  const handleDetailChange = (
    planIndex: number,
    detailIndex: number,
    field: keyof ISolutionPlanDetail,
    value: string
  ) => {
    const updatedPlans = [...plans];
    const currentDetails = [...(updatedPlans[planIndex].details || [])];
    currentDetails[detailIndex] = { ...currentDetails[detailIndex], [field]: value };
    updatedPlans[planIndex] = { ...updatedPlans[planIndex], details: currentDetails };
    onChange(updatedPlans);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {plans.map((plan, planIndex) => (
        <div key={planIndex} className="rounded-lg border bg-gray-50">
          {/* 플랜 헤더 */}
          <div
            className="flex cursor-pointer items-center justify-between p-4"
            onClick={() => toggleExpand(planIndex)}
          >
            <div className="flex items-center gap-2">
              {expandedIndex === planIndex ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="font-medium">{plan.name || `플랜 ${planIndex + 1}`}</span>
              {plan.price > 0 && (
                <span className="text-sm text-gray-500">({plan.price.toLocaleString()}원)</span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePlan(planIndex);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>

          {/* 플랜 상세 (펼쳐진 경우) */}
          {expandedIndex === planIndex && (
            <div className="space-y-4 border-t p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* 플랜명 */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">플랜명</label>
                  <Input
                    value={plan.name}
                    onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                    placeholder="예: Basic, Pro, Enterprise"
                  />
                </div>

                {/* 부제목 */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">부제목</label>
                  <Input
                    value={plan.subName || ''}
                    onChange={(e) => handlePlanChange(planIndex, 'subName', e.target.value)}
                    placeholder="예: 소규모 팀에 적합"
                  />
                </div>

                {/* 가격 */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">가격 (원)</label>
                  <Input
                    type="number"
                    value={plan.price}
                    onChange={(e) => handlePlanChange(planIndex, 'price', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                {/* 플랜 타입 */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">플랜 타입</label>
                  <Select
                    value={plan.planType}
                    onValueChange={(value) => handlePlanChange(planIndex, 'planType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="플랜 타입 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLAN_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 플랜 상세 항목 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">상세 항목</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddDetail(planIndex)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    항목 추가
                  </Button>
                </div>

                {(plan.details || []).map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2">
                    <Input
                      value={detail.name}
                      onChange={(e) => handleDetailChange(planIndex, detailIndex, 'name', e.target.value)}
                      placeholder="항목명"
                      className="flex-1"
                    />
                    <Input
                      value={detail.context}
                      onChange={(e) => handleDetailChange(planIndex, detailIndex, 'context', e.target.value)}
                      placeholder="내용"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => handleRemoveDetail(planIndex, detailIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}

                {(plan.details || []).length === 0 && (
                  <p className="text-center text-sm text-gray-400">상세 항목을 추가해주세요.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 플랜 추가 버튼 */}
      <Button type="button" variant="outline" onClick={handleAddPlan} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        플랜 추가
      </Button>

      {plans.length === 0 && (
        <p className="text-center text-sm text-gray-500">등록된 요금제가 없습니다.</p>
      )}
    </div>
  );
};

export default PlanInput;
