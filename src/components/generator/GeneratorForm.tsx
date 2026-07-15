import { memo } from "react";
import { GlassCard, GlassButton, GlassInput, SegmentedControl, Alert } from "@/components/ui";

import type { Gender } from "@/types/generator";

interface GeneratorFormProps {
  gender: Gender;
  count: number;
  separator: string;
  includeId: boolean;
  enabledFieldCount: number;
  onGenderChange: (gender: Gender) => void;
  onCountChange: (count: number) => void;
  onSeparatorChange: (separator: string) => void;
  onIncludeIdChange: (includeId: boolean) => void;
  onGenerate: () => void;
}

const genderOptions = [
  { value: 'random' as Gender, label: '隨機' },
  { value: 'male' as Gender, label: '男性' },
  { value: 'female' as Gender, label: '女性' },
];

const includeIdOptions = [
  { value: 'false', label: '不含' },
  { value: 'true', label: '含編號' },
];

export const GeneratorForm = memo(function GeneratorForm({
  gender,
  count,
  separator,
  includeId,
  enabledFieldCount,
  onGenderChange,
  onCountChange,
  onSeparatorChange,
  onIncludeIdChange,
  onGenerate,
}: GeneratorFormProps) {
  return (
    <GlassCard padding="sm">
      <div className="flex flex-col gap-3.5">
        {/* 設定控制項：寬螢幕併為一列以縮小佔比 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SegmentedControl
            label="性別"
            options={genderOptions}
            value={gender}
            onChange={onGenderChange}
            fullWidth
          />
          <SegmentedControl
            label="流水編號"
            options={includeIdOptions}
            value={includeId ? 'true' : 'false'}
            onChange={(v) => onIncludeIdChange(v === 'true')}
            fullWidth
          />
          <GlassInput
            label="生成數量"
            labelPlacement="outside"
            type="number"
            value={count.toString()}
            min={1}
            max={100}
            description="1 ~ 100 筆"
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') { onCountChange(1); return; }
              const num = parseInt(value);
              if (isNaN(num)) { onCountChange(1); return; }
              onCountChange(Math.min(100, Math.max(1, num)));
            }}
            onBlur={(e) => {
              const num = parseInt(e.target.value);
              if (isNaN(num) || num < 1) onCountChange(1);
              else if (num > 100) onCountChange(100);
            }}
          />
          <GlassInput
            label="欄位分隔符號"
            labelPlacement="outside"
            value={separator}
            maxLength={5}
            description="留空為空白分隔"
            onChange={(e) => onSeparatorChange(e.target.value)}
          />
        </div>

        {/* 底部：免責提示 + 生成按鈕，同一列並排以壓縮高度 */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <Alert
            className="flex-1"
            variant="warning"
            description="所有資料皆隨機模擬生成，並非真實數據，僅供格式學習、參考與開發測試使用，請勿用於非法用途，本網站不負任何法律責任。"
          />
          <GlassButton
            variant="primary"
            size="lg"
            onClick={onGenerate}
            className="lg:w-56 lg:flex-shrink-0"
            fullWidth
            aria-label={`生成 ${count} 筆資料，包含 ${enabledFieldCount} 個欄位`}
          >
            <span>生成資料</span>
            <span className="opacity-70 text-xs font-normal">
              {count} 筆 · {enabledFieldCount} 個欄位
            </span>
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
});
