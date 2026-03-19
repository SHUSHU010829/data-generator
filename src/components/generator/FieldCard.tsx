import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from '@heroui/switch';
import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';

import type { FieldConfig, IdType, YearFormat } from '@/types/generator';

interface FieldCardProps {
  field: FieldConfig;
  onToggle: (key: string) => void;
  onOptionChange: (key: string, optionKey: string, value: string) => void;
  onJsonKeyChange: (key: string, jsonKey: string) => void;
}

export function FieldCard({ field, onToggle, onOptionChange, onJsonKeyChange }: FieldCardProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  // 證件類型選項
  const idTypeOptions: { key: IdType; label: string }[] = [
    { key: 'random', label: '隨機' },
    { key: 'nationalId', label: '身分證' },
    { key: 'residentCert', label: '居留證' },
  ];

  // 年份格式選項
  const yearFormatOptions: { key: YearFormat; label: string }[] = [
    { key: 'western', label: '西元年' },
    { key: 'minguo', label: '民國年' },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 rounded-lg bg-default-50 hover:bg-default-100 transition-colors"
    >
      {/* 拖曳手把 */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-default-400 hover:text-default-600 text-lg"
      >
        ☰
      </div>

      {/* Switch 開關 */}
      <Switch
        isSelected={field.enabled}
        onValueChange={() => onToggle(field.key)}
        size="sm"
      >
        {field.label}
      </Switch>

      {/* JSON 欄位名稱 */}
      <Input
        label="JSON 欄位名稱"
        size="sm"
        className="w-40"
        value={field.jsonKey ?? field.key}
        isDisabled={!field.enabled}
        onChange={(e) => onJsonKeyChange(field.key, e.target.value)}
      />

      {/* 證件號碼的選項 */}
      {field.key === 'idNumber' && field.options && (
        <Select
          label="證件類型"
          size="sm"
          className="w-32 ml-auto"
          selectedKeys={[field.options.idType || 'random']}
          isDisabled={!field.enabled}
          onChange={(e) => onOptionChange(field.key, 'idType', e.target.value)}
        >
          {idTypeOptions.map((option) => (
            <SelectItem key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* 生日的選項 */}
      {field.key === 'birthday' && field.options && (
        <Select
          label="年份格式"
          size="sm"
          className="w-32 ml-auto"
          selectedKeys={[field.options.yearFormat || 'western']}
          isDisabled={!field.enabled}
          onChange={(e) => onOptionChange(field.key, 'yearFormat', e.target.value)}
        >
          {yearFormatOptions.map((option) => (
            <SelectItem key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
}
