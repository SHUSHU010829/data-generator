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
}

export function DataTable({ data, separator, fields }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 取得啟用的欄位
  const enabledFields = fields.filter((f) => f.enabled);

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
      <CardHeader>
        <h2 className="text-xl font-bold">生成結果</h2>
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
                      {copiedId === `row-${index}` ? "已複製 ✓" : "複製全部"}
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
