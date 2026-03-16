import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import type { Gender, IdType } from "@/types/generator";

interface GeneratorFormProps {
  onGenerate: (
    gender: Gender,
    idType: IdType,
    count: number,
    separator: string,
  ) => void;
}

export function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [gender, setGender] = useState<Gender>("random");
  const [idType, setIdType] = useState<IdType>("random");
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>("\t");

  const handleGenerate = () => {
    onGenerate(gender, idType, count, separator);
  };

  return (
    <Card className="w-full p-2">
      <CardBody>
        <div className="flex flex-col gap-4">
          {/* 第一行：所有選項 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <Select
              label="證件類型"
              placeholder="選擇證件類型"
              selectedKeys={[idType]}
              className="flex-1"
              onChange={(e) => setIdType(e.target.value as IdType)}
            >
              <SelectItem key="random">隨機</SelectItem>
              <SelectItem key="nationalId">身分證</SelectItem>
              <SelectItem key="residentCert">居留證（新舊版隨機）</SelectItem>
            </Select>

            <Select
              label="性別"
              placeholder="選擇性別"
              selectedKeys={[gender]}
              className="flex-1"
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <SelectItem key="random">隨機</SelectItem>
              <SelectItem key="male">男性</SelectItem>
              <SelectItem key="female">女性</SelectItem>
            </Select>

            <Input
              type="number"
              label="生成數量"
              placeholder="輸入數量"
              value={count.toString()}
              min={1}
              max={100}
              className="flex-1"
              onChange={(e) =>
                setCount(
                  Math.min(100, Math.max(1, parseInt(e.target.value) || 1)),
                )
              }
            />
            <Input
              label="欄位分隔符號（預設為 Tab）"
              placeholder="預設為 Tab"
              value={separator}
              className="flex-1"
              onChange={(e) => setSeparator(e.target.value)}
            />
          </div>

          {/* 第二行：按鈕 */}
          <Button
            color="primary"
            size="lg"
            className="w-full"
            onPress={handleGenerate}
          >
            生成資料
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
