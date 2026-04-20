import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { GlassSwitch, GlassInput, SegmentedControl } from '@/components/ui';

import type { FieldConfig, IdType, YearFormat } from '@/types/generator';

interface FieldCardProps {
  field: FieldConfig;
  onToggle: (key: string) => void;
  onOptionChange: (key: string, optionKey: string, value: string) => void;
  onJsonKeyChange: (key: string, jsonKey: string) => void;
}

const idTypeOptions: { value: IdType; label: string }[] = [
  { value: 'random', label: '隨機' },
  { value: 'nationalId', label: '身分證' },
  { value: 'residentCert', label: '居留證' },
];

const yearFormatOptions: { value: YearFormat; label: string }[] = [
  { value: 'western', label: '西元年' },
  { value: 'minguo', label: '民國年' },
];

/* 六點拖曳 handle icon */
const DragIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="4" cy="3" r="1.2" fill="currentColor"/>
    <circle cx="4" cy="7" r="1.2" fill="currentColor"/>
    <circle cx="4" cy="11" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="3" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="7" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="11" r="1.2" fill="currentColor"/>
  </svg>
);

export const FieldCard = memo(function FieldCard({ field, onToggle, onOptionChange, onJsonKeyChange }: FieldCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      animate={{ opacity: isDragging ? 0.5 : 1 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        'flex flex-col sm:flex-row sm:items-center gap-3',
        'p-3 rounded-[var(--radius-md)]',
        'glass-interactive',
        isDragging && 'z-10',
      )}
    >
      {/* 左側：拖曳手把 + Switch */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* 拖曳手把 */}
        <div
          {...attributes}
          {...listeners}
          className={clsx(
            'cursor-grab active:cursor-grabbing',
            'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
            'transition-colors duration-[var(--dur-fast)]',
            'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded',
            'min-h-[44px] min-w-[44px] flex items-center justify-center',
          )}
          role="button"
          aria-label={`拖曳以調整 ${field.label} 的順序`}
          tabIndex={0}
        >
          <DragIcon />
        </div>

        {/* Switch 開關 */}
        <GlassSwitch
          checked={field.enabled}
          onChange={() => onToggle(field.key)}
          label={field.label}
          size="sm"
        />
      </div>

      {/* 右側：JSON 欄位名稱 + 選項 */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:ml-auto w-full sm:w-auto">
        <GlassInput
          label="JSON 欄位名稱"
          wrapperClassName="w-full sm:w-44"
          value={field.jsonKey ?? field.key}
          disabled={!field.enabled}
          onChange={(e) => onJsonKeyChange(field.key, e.target.value)}
        />

        {field.key === 'idNumber' && field.options && (
          <SegmentedControl
            label="證件類型"
            options={idTypeOptions}
            value={field.options.idType ?? 'random'}
            onChange={(v) => onOptionChange(field.key, 'idType', v)}
            disabled={!field.enabled}
            size="sm"
            className="w-full sm:w-auto"
          />
        )}

        {field.key === 'birthday' && field.options && (
          <SegmentedControl
            label="年份格式"
            options={yearFormatOptions}
            value={field.options.yearFormat ?? 'western'}
            onChange={(v) => onOptionChange(field.key, 'yearFormat', v)}
            disabled={!field.enabled}
            size="sm"
            className="w-full sm:w-auto"
          />
        )}
      </div>
    </motion.div>
  );
});
