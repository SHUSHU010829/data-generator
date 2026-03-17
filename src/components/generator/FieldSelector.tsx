import { useState } from 'react';
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
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';

import type { FieldConfig } from '@/types/generator';
import { FieldCard } from './FieldCard';

interface FieldSelectorProps {
  fields: FieldConfig[];
  onFieldsChange: (fields: FieldConfig[]) => void;
}

export function FieldSelector({ fields, onFieldsChange }: FieldSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleToggle = (key: string) => {
    const newFields = fields.map((field) =>
      field.key === key ? { ...field, enabled: !field.enabled } : field
    );
    onFieldsChange(newFields);
  };

  const handleOptionChange = (key: string, optionKey: string, value: string) => {
    const newFields = fields.map((field) =>
      field.key === key
        ? {
            ...field,
            options: {
              ...field.options,
              [optionKey]: value,
            },
          }
        : field
    );
    onFieldsChange(newFields);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.key === active.id);
      const newIndex = fields.findIndex((field) => field.key === over.id);
      const newFields = arrayMove(fields, oldIndex, newIndex);
      onFieldsChange(newFields);
    }
  };

  const handleSelectAll = () => {
    const newFields = fields.map((field) => ({ ...field, enabled: true }));
    onFieldsChange(newFields);
  };

  const handleDeselectAll = () => {
    const newFields = fields.map((field) => ({ ...field, enabled: false }));
    onFieldsChange(newFields);
  };

  const enabledCount = fields.filter((f) => f.enabled).length;

  return (
    <Card className="w-full p-2">
      <CardHeader
        className="flex justify-between cursor-pointer hover:bg-default-100 transition-colors rounded-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">欄位設定</h3>
          <span className="text-sm text-default-500">
            ({enabledCount}/{fields.length} 個欄位)
          </span>
          <span className="text-default-400">{isExpanded ? '▼' : '▶'}</span>
        </div>
        {isExpanded && (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="flat" onPress={handleSelectAll}>
              全選
            </Button>
            <Button size="sm" variant="flat" onPress={handleDeselectAll}>
              全不選
            </Button>
          </div>
        )}
      </CardHeader>
      {isExpanded && (
        <CardBody>
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
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardBody>
      )}
    </Card>
  );
}
