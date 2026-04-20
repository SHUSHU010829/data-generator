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
    <GlassCard padding="md">
      <div className="flex flex-col gap-5">
        {/* 第一排：性別、流水編號 */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <SegmentedControl
              label="性別"
              options={genderOptions}
              value={gender}
              onChange={onGenderChange}
              fullWidth
            />
          </div>
          <div className="flex-1">
            <SegmentedControl
              label="流水編號"
              options={includeIdOptions}
              value={includeId ? 'true' : 'false'}
              onChange={(v) => onIncludeIdChange(v === 'true')}
              fullWidth
            />
          </div>
        </div>

        {/* 第二排：生成數量、分隔符號 */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <GlassInput
            label="生成數量"
            type="number"
            value={count.toString()}
            min={1}
            max={100}
            description="最少 1 筆，最多 100 筆"
            wrapperClassName="flex-1"
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
            value={separator}
            maxLength={5}
            description="留空表示使用空白分隔"
            wrapperClassName="flex-1"
            onChange={(e) => onSeparatorChange(e.target.value)}
          />
        </div>

        {/* 使用須知 */}
        <Alert
          variant="warning"
          title="使用須知"
          description="所有資料皆隨機模擬生成，並非真實數據，且僅限用於格式學習、參考以及開發測試，請不要用於非法用途且用戶不應過度信賴網站內容，本網站不負任何法律責任，特此聲明。"
        />

        {/* 生成按鈕 */}
        <GlassButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={onGenerate}
          aria-label={`生成 ${count} 筆資料，包含 ${enabledFieldCount} 個欄位`}
        >
          <span>生成資料</span>
          <span className="opacity-70 text-xs font-normal">
            {count} 筆 · {enabledFieldCount} 個欄位
          </span>
        </GlassButton>
      </div>
    </GlassCard>
  );
});
