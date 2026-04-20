import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { GlassCard, GlassButton, Chip, Tooltip, EmptyState } from "@/components/ui";
import { useToast } from "@/hooks/useToast";

import type { FakeData, FieldConfig, FieldType } from "@/types/generator";

interface DataTableProps {
  data: FakeData[];
  separator: string;
  fields: FieldConfig[];
  includeId: boolean;
}

export function DataTable({ data, separator, fields, includeId }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const enabledFields = useMemo(() => fields.filter((f) => f.enabled), [fields]);

  const hasEmptyJsonKey = useMemo(
    () => enabledFields.some((field) => !field.jsonKey || field.jsonKey.trim() === ''),
    [enabledFields],
  );

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    if (!navigator.clipboard) {
      toast({ title: '複製失敗', description: '您的瀏覽器不支援自動複製功能', variant: 'error' });
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      return true;
    } catch (err) {
      toast({ title: '複製失敗', description: '請手動選取並複製', variant: 'error' });
      console.error('複製失敗:', err);
      return false;
    }
  }, [toast]);

  const copyRow = useCallback(async (row: FakeData, index: number) => {
    const values = enabledFields.map((field) => row[field.key]);
    const text = values.join(separator);
    const ok = await copyToClipboard(text, `row-${index}`);
    if (ok) toast({ title: '已複製列資料', variant: 'success' });
  }, [enabledFields, separator, copyToClipboard, toast]);

  const formatRowPlain = useCallback((row: FakeData, index: number): string => {
    const values: (string | number)[] = [];
    if (includeId) values.push(index + 1);
    enabledFields.forEach((field) => values.push(row[field.key]));
    return values.join(separator);
  }, [includeId, enabledFields, separator]);

  const formatRowJson = useCallback((row: FakeData, index: number): string => {
    const obj: Record<string, string | number> = {};
    if (includeId) obj.id = index + 1;
    enabledFields.forEach((field) => { obj[field.jsonKey || field.key] = row[field.key]; });
    return JSON.stringify(obj);
  }, [includeId, enabledFields]);

  const copyAllData = useCallback(async () => {
    const text = data.map((row, i) => formatRowPlain(row, i)).join('\n');
    const ok = await copyToClipboard(text, 'all-data');
    if (ok) toast({ title: `已複製全部 ${data.length} 筆資料`, variant: 'success' });
  }, [data, formatRowPlain, copyToClipboard, toast]);

  const downloadBlob = useCallback((content: string, type: string, ext: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
    link.href = url;
    link.download = `data_${timestamp}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const downloadTxt = useCallback(() => {
    try {
      const text = data.map((row, i) => formatRowPlain(row, i)).join('\n');
      downloadBlob(text, 'text/plain;charset=utf-8', 'txt');
      toast({ title: '已下載 TXT 檔案', variant: 'success' });
    } catch (err) {
      toast({ title: '下載失敗', description: '請重試', variant: 'error' });
      console.error('下載失敗:', err);
    }
  }, [data, formatRowPlain, downloadBlob, toast]);

  const downloadJson = useCallback(() => {
    if (hasEmptyJsonKey) {
      toast({ title: '下載失敗', description: '部分欄位缺少 JSON 欄位名稱，請在欄位設定中補充', variant: 'warning' });
      return;
    }
    try {
      const text = data.map((row, i) => formatRowJson(row, i)).join('\n');
      downloadBlob(text, 'application/json;charset=utf-8', 'json');
      toast({ title: '已下載 JSON 檔案', variant: 'success' });
    } catch (err) {
      toast({ title: '下載失敗', description: '請重試', variant: 'error' });
      console.error('下載失敗:', err);
    }
  }, [hasEmptyJsonKey, data, formatRowJson, downloadBlob, toast]);

  const renderCopyableCell = useCallback((row: FakeData, field: FieldType, index: number) => {
    const value = row[field];
    const copyId = `${field}-${index}`;
    const fieldLabel = enabledFields.find(f => f.key === field)?.label || field;
    const isCopied = copiedId === copyId;
    const isMono = field === 'idNumber' || field === 'zipCode' || field === 'phone';

    return (
      <Tooltip content="點擊複製" placement="top">
        <button
          className={clsx(
            'cursor-pointer rounded px-1 py-0.5',
            'text-[var(--text-primary)] hover:text-accent',
            'transition-colors duration-[var(--dur-fast)]',
            'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
            isMono && 'font-mono text-xs',
          )}
          onClick={() => copyToClipboard(value, copyId)}
          aria-label={`複製${fieldLabel}：${value}`}
        >
          {value}
          {isCopied && (
            <span className="ml-1.5 text-xs text-success" aria-live="polite">✓</span>
          )}
        </button>
      </Tooltip>
    );
  }, [enabledFields, copiedId, copyToClipboard]);

  return (
    <GlassCard padding="none">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">生成結果</h2>
          {data.length > 0 && (
            <span className="text-xs text-[var(--text-tertiary)]">{data.length} 筆</span>
          )}
        </div>
        {data.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={copyAllData}
              className="flex-1 sm:flex-initial min-w-[90px]"
            >
              {copiedId === 'all-data' ? '已複製 ✓' : '複製全部'}
            </GlassButton>
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={downloadTxt}
              className="flex-1 sm:flex-initial min-w-[90px]"
            >
              下載 TXT
            </GlassButton>
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={downloadJson}
              disabled={hasEmptyJsonKey}
              className="flex-1 sm:flex-initial min-w-[90px]"
            >
              下載 JSON
            </GlassButton>
          </div>
        )}
      </div>

      <div className="h-px bg-[var(--border-hairline)] mx-5" />

      {/* 內容區域 */}
      {data.length === 0 ? (
        <EmptyState
          icon="📋"
          title="尚無資料"
          description="設定完欄位後，點擊「生成資料」或按 ⌘↵ 開始"
        />
      ) : (
        <>
          {/* 行動版：卡片佈局 */}
          <div className="block md:hidden px-4 py-4">
            <div className="flex flex-col gap-3">
              {data.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className={clsx(
                    'p-4 rounded-[var(--radius-md)]',
                    'border border-[var(--border-hairline)]',
                    'bg-[var(--surface-glass)]',
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Chip color={row.gender === 'male' ? 'blue' : 'pink'}>
                      {row.gender === 'male' ? '男' : '女'}
                    </Chip>
                    <GlassButton
                      size="sm"
                      variant="ghost"
                      onClick={() => copyRow(row, index)}
                      aria-label={`複製第 ${index + 1} 列資料`}
                    >
                      {copiedId === `row-${index}` ? '已複製 ✓' : '複製'}
                    </GlassButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    {enabledFields.map((field) => (
                      <div key={field.key} className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
                          {field.label}
                        </span>
                        <button
                          className={clsx(
                            'text-left text-sm cursor-pointer',
                            'text-[var(--text-primary)] hover:text-accent',
                            'transition-colors duration-[var(--dur-fast)]',
                            'focus-visible:outline-2 focus-visible:outline-accent rounded px-1',
                            'min-h-[44px] flex items-center',
                            (field.key === 'idNumber' || field.key === 'zipCode' || field.key === 'phone') && 'font-mono text-xs',
                          )}
                          onClick={() => copyToClipboard(row[field.key], `mobile-${field.key}-${index}`)}
                          aria-label={`複製${field.label}：${row[field.key]}`}
                        >
                          {row[field.key]}
                          {copiedId === `mobile-${field.key}-${index}` && (
                            <span className="ml-1.5 text-xs text-success" aria-live="polite">✓</span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 桌面版：表格佈局 */}
          <div className="hidden md:block overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="生成的假資料列表"
            >
              <thead>
                <tr className="border-b border-[var(--border-hairline)]">
                  {includeId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)] w-12">
                      #
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)] w-16">
                    性別
                  </th>
                  {enabledFields.map((field) => (
                    <th
                      key={field.key}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]"
                    >
                      {field.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)] w-36">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.18 }}
                    className={clsx(
                      'border-b border-[var(--border-hairline)] last:border-0',
                      'hover:bg-[var(--surface-glass)] transition-colors duration-[var(--dur-fast)]',
                    )}
                  >
                    {includeId && (
                      <td className="px-4 py-3 text-xs text-[var(--text-tertiary)] font-mono">
                        {index + 1}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <Chip color={row.gender === 'male' ? 'blue' : 'pink'}>
                        {row.gender === 'male' ? '男' : '女'}
                      </Chip>
                    </td>
                    {enabledFields.map((field) => (
                      <td key={field.key} className="px-4 py-3">
                        {renderCopyableCell(row, field.key, index)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <GlassButton
                        size="sm"
                        variant={copiedId === `row-${index}` ? 'ghost' : 'secondary'}
                        onClick={() => copyRow(row, index)}
                      >
                        {copiedId === `row-${index}` ? '已複製 ✓' : '複製整列'}
                      </GlassButton>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </GlassCard>
  );
}
