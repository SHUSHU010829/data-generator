import { useState } from "react";
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

  // 取得啟用的欄位
  const enabledFields = fields.filter((f) => f.enabled);

  // 檢查是否所有啟用的欄位都有 jsonKey
  const hasEmptyJsonKey = enabledFields.some((field) => !field.jsonKey || field.jsonKey.trim() === '');

  // 複製文字到剪貼簿
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("複製失敗:", err);
    }
  };

  // 複製整列資料
  const copyRow = async (row: FakeData, index: number) => {
    const values = enabledFields.map((field) => row[field.key]);
    const text = values.join(separator);
    await copyToClipboard(text, `row-${index}`);
  };

  // 格式化單筆資料（純數值）
  const formatRowPlain = (row: FakeData, index: number): string => {
    const values: (string | number)[] = [];
    if (includeId) {
      values.push(index + 1);
    }
    enabledFields.forEach((field) => {
      values.push(row[field.key]);
    });
    return values.join(separator);
  };

  // 格式化單筆資料（JSON）
  const formatRowJson = (row: FakeData, index: number): string => {
    const obj: Record<string, string | number> = {};
    if (includeId) {
      obj.id = index + 1;
    }
    enabledFields.forEach((field) => {
      const jsonKey = field.jsonKey || field.key;
      obj[jsonKey] = row[field.key];
    });
    return JSON.stringify(obj);
  };

  // 格式化全部資料（純數值）
  const formatAllDataPlain = (): string => {
    return data.map((row, index) => formatRowPlain(row, index)).join('\n');
  };

  // 格式化全部資料（JSON）
  const formatAllDataJson = (): string => {
    return data.map((row, index) => formatRowJson(row, index)).join('\n');
  };

  // 複製全部資料（純數值）
  const copyAllData = async () => {
    const text = formatAllDataPlain();
    await copyToClipboard(text, 'all-data');
  };

  // 下載為 txt 檔案（純數值）
  const downloadTxt = () => {
    const text = formatAllDataPlain();
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
  };

  // 下載為 json 檔案
  const downloadJson = () => {
    const text = formatAllDataJson();
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
  };

  // 渲染欄位內容
  const renderFieldCell = (row: FakeData, field: FieldType, index: number) => {
    const value = row[field];
    const copyId = `${field}-${index}`;

    return (
      <Tooltip content="點擊複製" placement="top">
        <button
          className={`cursor-pointer hover:text-primary ${field === 'idNumber' || field === 'zipCode' || field === 'phone' ? 'font-mono' : ''}`}
          onClick={() => copyToClipboard(value, copyId)}
        >
          {value}
          {copiedId === copyId && (
            <span className="ml-2 text-xs text-success">✓</span>
          )}
        </button>
      </Tooltip>
    );
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-xl font-bold">生成結果</h2>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={copyAllData}
          >
            {copiedId === 'all-data' ? '已複製 ✓' : '複製全部'}
          </Button>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={downloadTxt}
          >
            下載 TXT
          </Button>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={downloadJson}
            isDisabled={hasEmptyJsonKey}
          >
            下載 JSON
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        <Table
          aria-label="假資料表格"
          className="min-w-full"
          isStriped
          removeWrapper
        >
          <TableHeader>
            {[
              <TableColumn key="gender">性別</TableColumn>,
              ...enabledFields.map((field) => (
                <TableColumn key={field.key}>{field.label}</TableColumn>
              )),
              <TableColumn key="actions">操作</TableColumn>,
            ]}
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {[
                  <TableCell key="gender">
                    <Chip
                      color={row.gender === "male" ? "primary" : "secondary"}
                      size="sm"
                    >
                      {row.gender === "male" ? "男" : "女"}
                    </Chip>
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
                ]}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
