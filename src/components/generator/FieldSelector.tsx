import { useState, memo, useCallback, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SlidersHorizontal } from 'lucide-react';
import { GlassButton, GlassDialog } from '@/components/ui';

import type { FieldConfig } from '@/types/generator';
import { FieldCard } from './FieldCard';

interface FieldSelectorProps {
  fields: FieldConfig[];
  onFieldsChange: (fields: FieldConfig[]) => void;
}

export const FieldSelector = memo(function FieldSelector({ fields, onFieldsChange }: FieldSelectorProps) {
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleToggle = useCallback((key: string) => {
    onFieldsChange(fields.map((f) => f.key === key ? { ...f, enabled: !f.enabled } : f));
  }, [fields, onFieldsChange]);

  const handleOptionChange = useCallback((key: string, optionKey: string, value: string) => {
    onFieldsChange(fields.map((f) =>
      f.key === key ? { ...f, options: { ...f.options, [optionKey]: value } } : f
    ));
  }, [fields, onFieldsChange]);

  const handleJsonKeyChange = useCallback((key: string, jsonKey: string) => {
    onFieldsChange(fields.map((f) => f.key === key ? { ...f, jsonKey } : f));
  }, [fields, onFieldsChange]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.key === active.id);
      const newIndex = fields.findIndex((f) => f.key === over.id);
      onFieldsChange(arrayMove(fields, oldIndex, newIndex));
    }
  }, [fields, onFieldsChange]);

  const handleSelectAll = useCallback(() => {
    onFieldsChange(fields.map((f) => ({ ...f, enabled: true })));
  }, [fields, onFieldsChange]);

  const handleDeselectAll = useCallback(() => {
    onFieldsChange(fields.map((f) => ({ ...f, enabled: false })));
  }, [fields, onFieldsChange]);

  const enabledCount = useMemo(() => fields.filter((f) => f.enabled).length, [fields]);

  return (
    <>
      {/* 觸發按鈕 */}
      <div className="flex items-center gap-3">
        <GlassButton
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
          iconLeft={<SlidersHorizontal size={15} strokeWidth={2} />}
          aria-label={`欄位設定，目前已選 ${enabledCount} 個欄位`}
        >
          欄位設定
        </GlassButton>

        {/* 欄位計數標籤 */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
          {enabledCount}
          <span className="text-accent/50">/ {fields.length}</span>
        </span>

        {/* 已啟用欄位的快速預覽 */}
        <div className="hidden sm:flex flex-wrap gap-1.5">
          {fields
            .filter((f) => f.enabled)
            .slice(0, 5)
            .map((f) => (
              <span
                key={f.key}
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
              >
                {f.label}
              </span>
            ))}
          {enabledCount > 5 && (
            <span className="text-xs px-2 py-0.5 text-[var(--text-tertiary)]">
              +{enabledCount - 5}
            </span>
          )}
        </div>
      </div>

      {/* Dialog */}
      <GlassDialog
        open={open}
        onOpenChange={setOpen}
        title="欄位設定"
        description={`拖曳排序、開關欄位、自訂 JSON 名稱（已選 ${enabledCount} / ${fields.length}）`}
        maxWidth="lg"
        footer={
          <>
            <GlassButton size="sm" variant="ghost" onClick={handleDeselectAll}>
              全不選
            </GlassButton>
            <GlassButton size="sm" variant="ghost" onClick={handleSelectAll}>
              全選
            </GlassButton>
            <GlassButton size="sm" variant="primary" onClick={() => setOpen(false)}>
              完成
            </GlassButton>
          </>
        }
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields.map((f) => f.key)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {fields.map((field) => (
                <FieldCard
                  key={field.key}
                  field={field}
                  onToggle={handleToggle}
                  onOptionChange={handleOptionChange}
                  onJsonKeyChange={handleJsonKeyChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </GlassDialog>
    </>
  );
});
