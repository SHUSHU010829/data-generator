import { useState, useCallback, useMemo } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

import type { FakeData, FieldConfig, FieldType } from "@/types/generator";

interface DataTableProps {
  data: FakeData[];
  separator: string;
  fields: FieldConfig[];
  includeId: boolean;
}

export function DataTable({ data, separator, fields, includeId }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 使用 useMemo 快取計算結果
  const enabledFields = useMemo(() => fields.filter((f) => f.enabled), [fields]);

  // 檢查是否所有啟用的欄位都有 jsonKey
  const hasEmptyJsonKey = useMemo(
    () => enabledFields.some((field) => !field.jsonKey || field.jsonKey.trim() === ''),
    [enabledFields]
  );

  // 使用 useCallback 避免函數重新建立
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      // 檢查是否支援 Clipboard API
      if (!navigator.clipboard) {
        console.warn("您的瀏覽器不支援自動複製功能");
        return;
      }

      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("複製失敗:", err);

      // 提供明確的錯誤訊息
      console.error("複製失敗", err);
    }
  }, []);

  // 複製整列資料
  const copyRow = useCallback(async (row: FakeData, index: number) => {
    const values = enabledFields.map((field) => row[field.key]);
    const text = values.join(separator);
    await copyToClipboard(text, `row-${index}`);
  }, [enabledFields, separator, copyToClipboard]);

  // 格式化單筆資料（純數值）
  const formatRowPlain = useCallback((row: FakeData, index: number): string => {
    const values: (string | number)[] = [];
    if (includeId) {
      values.push(index + 1);
    }
    enabledFields.forEach((field) => {
      values.push(row[field.key]);
    });
    return values.join(separator);
  }, [includeId, enabledFields, separator]);

  // 格式化單筆資料（JSON）
  const formatRowJson = useCallback((row: FakeData, index: number): string => {
    const obj: Record<string, string | number> = {};
    if (includeId) {
      obj.id = index + 1;
    }
    enabledFields.forEach((field) => {
      const jsonKey = field.jsonKey || field.key;
      obj[jsonKey] = row[field.key];
    });
    return JSON.stringify(obj);
  }, [includeId, enabledFields]);

  // 格式化全部資料（純數值）
  const formatAllDataPlain = useCallback((): string => {
    return data.map((row, index) => formatRowPlain(row, index)).join('\n');
  }, [data, formatRowPlain]);

  // 格式化全部資料（JSON）
  const formatAllDataJson = useCallback((): string => {
    return data.map((row, index) => formatRowJson(row, index)).join('\n');
  }, [data, formatRowJson]);

  // 複製全部資料（純數值）
  const copyAllData = useCallback(async () => {
    const text = formatAllDataPlain();
    await copyToClipboard(text, 'all-data');
  }, [formatAllDataPlain, copyToClipboard]);

  // 下載為 txt 檔案（純數值）
  const downloadTxt = useCallback(() => {
    try {
      const text = formatAllDataPlain();

      // 檢查是否有資料
      if (!text || text.trim() === '') {
        console.error("沒有資料可下載");
        return;
      }

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
      const filename = `data_${timestamp}.txt`;

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`已下載 ${filename}`);
    } catch (err) {
      console.error("下載失敗:", err);
      console.error("下載失敗，請重試");
    }
  }, [formatAllDataPlain]);

  // 下載為 json 檔案
  const downloadJson = useCallback(() => {
    try {
      // 二次檢查 jsonKey（防禦性編程）
      if (hasEmptyJsonKey) {
        console.error("部分欄位缺少 JSON 欄位名稱，請在「欄位設定」中補充");
        return;
      }

      const text = formatAllDataJson();

      // 檢查是否有資料
      if (!text || text.trim() === '') {
        console.error("沒有資料可下載");
        return;
      }

      // 驗證 JSON 格式
      try {
        JSON.parse(`[${text}]`);
      } catch (parseErr) {
        console.error("JSON 格式錯誤:", parseErr);
        console.error("資料格式錯誤，無法生成 JSON 檔案");
        return;
      }

      const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
      const filename = `data_${timestamp}.json`;

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`已下載 ${filename}`);
    } catch (err) {
      console.error("下載失敗:", err);
      console.error("下載失敗，請重試");
    }
  }, [hasEmptyJsonKey, formatAllDataJson]);

  // 渲染欄位內容
  const renderFieldCell = useCallback((row: FakeData, field: FieldType, index: number) => {
    const value = row[field];
    const copyId = `${field}-${index}`;

    // 取得欄位標籤用於 aria-label
    const fieldLabel = enabledFields.find(f => f.key === field)?.label || field;

    return (
      <Tooltip content="點擊複製" placement="top">
        <button
          className={`cursor-pointer hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1 ${field === 'idNumber' || field === 'zipCode' || field === 'phone' ? 'font-mono' : ''}`}
          onClick={() => copyToClipboard(value, copyId)}
          aria-label={`複製${fieldLabel}：${value}`}
        >
          {value}
          {copiedId === copyId && (
            <span className="ml-2 text-xs text-success" aria-hidden="true">✓</span>
          )}
        </button>
      </Tooltip>
    );
  }, [enabledFields, copiedId, copyToClipboard]);

  // 生成表格列標題
  const columns = useMemo(() => {
    return [
      <TableColumn key="gender">性別</TableColumn>,
      ...enabledFields.map((field) => (
        <TableColumn key={field.key}>{field.label}</TableColumn>
      )),
      <TableColumn key="actions">操作</TableColumn>,
    ];
  }, [enabledFields]);

  // 生成表格行內容
  const renderRow = useCallback((row: FakeData, index: number) => {
    return [
      <TableCell key="gender">
        <div className="flex items-center gap-1">
          <Chip
            color={row.gender === "male" ? "primary" : "secondary"}
            size="sm"
          >
            {row.gender === "male" ? "男" : "女"}
          </Chip>
          {row.isForeigner && (
            <Chip color="warning" size="sm" variant="flat">
              外國人
            </Chip>
          )}
        </div>
      </TableCell>,
      ...enabledFields.map((field) => (
        <TableCell key={field.key}>
          {renderFieldCell(row, field.key, index)}
        </TableCell>
      )),
      <TableCell key="actions">
        <Button
          size="sm"
          variant="flat"
          onPress={() => copyRow(row, index)}
        >
          {copiedId === `row-${index}` ? "已複製 ✓" : "複製整列"}
        </Button>
      </TableCell>,
    ];
  }, [enabledFields, renderFieldCell, copyRow, copiedId]);

  if (data.length === 0) {
    return null;
  }

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">生成結果</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="flex-1 sm:flex-initial min-w-[100px]"
            onPress={copyAllData}
          >
            {copiedId === 'all-data' ? '已複製 ✓' : '複製全部'}
          </Button>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="flex-1 sm:flex-initial min-w-[100px]"
            onPress={downloadTxt}
          >
            下載 TXT
          </Button>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="flex-1 sm:flex-initial min-w-[100px]"
            onPress={downloadJson}
            isDisabled={hasEmptyJsonKey}
          >
            下載 JSON
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        {/* 行動版：卡片式佈局 */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-3">
            {data.map((row, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-default-50 border border-default-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Chip
                      color={row.gender === "male" ? "primary" : "secondary"}
                      size="sm"
                    >
                      {row.gender === "male" ? "男" : "女"}
                    </Chip>
                    {row.isForeigner && (
                      <Chip color="warning" size="sm" variant="flat">
                        外國人
                      </Chip>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    className="min-h-[44px]"
                    onPress={() => copyRow(row, index)}
                    aria-label={`複製第 ${index + 1} 列資料`}
                  >
                    {copiedId === `row-${index}` ? "已複製 ✓" : "複製"}
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {enabledFields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <span className="text-xs text-default-500">{field.label}</span>
                      <button
                        className={`text-left cursor-pointer hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-2 min-h-[44px] ${field.key === 'idNumber' || field.key === 'zipCode' || field.key === 'phone' ? 'font-mono' : ''}`}
                        onClick={() => copyToClipboard(row[field.key], `mobile-${field.key}-${index}`)}
                        aria-label={`複製${field.label}：${row[field.key]}`}
                      >
                        {row[field.key]}
                        {copiedId === `mobile-${field.key}-${index}` && (
                          <span className="ml-2 text-xs text-success" aria-hidden="true">✓</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 平板/桌面版：表格佈局 */}
        <div className="hidden md:block">
          <Table
            aria-label="生成的假資料列表"
            aria-describedby="table-description"
            className="min-w-full"
            isStriped
            removeWrapper
          >
            <TableHeader>
              {columns}
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {renderRow(row, index)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
