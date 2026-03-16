import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Switch } from '@heroui/switch';
import { Button } from '@heroui/button';

import type { FieldConfig } from '@/types/generator';

interface FieldSelectorProps {
  fields: FieldConfig[];
  onFieldsChange: (fields: FieldConfig[]) => void;
}

export function FieldSelector({ fields, onFieldsChange }: FieldSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (key: string) => {
    const newFields = fields.map((field) =>
      field.key === key ? { ...field, enabled: !field.enabled } : field
    );
    onFieldsChange(newFields);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newFields = [...fields];
    [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
    onFieldsChange(newFields);
  };

  const handleMoveDown = (index: number) => {
    if (index === fields.length - 1) return;
    const newFields = [...fields];
    [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    onFieldsChange(newFields);
  };

  const handleSelectAll = () => {
    const newFields = fields.map((field) => ({ ...field, enabled: true }));
    onFieldsChange(newFields);
  };

  const handleDeselectAll = () => {
    const newFields = fields.map((field) => ({ ...field, enabled: false }));
    onFieldsChange(newFields);
  };

  const enabledCount = fields.filter(f => f.enabled).length;

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
          <span className="text-default-400">
            {isExpanded ? '▼' : '▶'}
          </span>
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
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-default-100"
            >
              <Switch
                isSelected={field.enabled}
                onValueChange={() => handleToggle(field.key)}
                size="sm"
              >
                {field.label}
              </Switch>

              <div className="ml-auto flex gap-1">
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  isDisabled={index === 0}
                  onPress={() => handleMoveUp(index)}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  isDisabled={index === fields.length - 1}
                  onPress={() => handleMoveDown(index)}
                >
                  ↓
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      )}
    </Card>
  );
}
