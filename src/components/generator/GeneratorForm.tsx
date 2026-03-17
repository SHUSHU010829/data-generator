import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import type { Gender } from "@/types/generator";

interface GeneratorFormProps {
  gender: Gender;
  count: number;
  separator: string;
  onGenderChange: (gender: Gender) => void;
  onCountChange: (count: number) => void;
  onSeparatorChange: (separator: string) => void;
  onGenerate: () => void;
}

export function GeneratorForm({
  gender,
  count,
  separator,
  onGenderChange,
  onCountChange,
  onSeparatorChange,
  onGenerate,
}: GeneratorFormProps) {
  return (
    <Card className="w-full p-2">
      <CardBody>
        <div className="flex flex-col gap-4">
          {/* 固定選項：性別、生成數量、分隔符號 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <Select
              label="性別"
              placeholder="選擇性別"
              selectedKeys={[gender]}
              className="flex-1"
              onChange={(e) => onGenderChange(e.target.value as Gender)}
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
                onCountChange(
                  Math.min(100, Math.max(1, parseInt(e.target.value) || 1)),
                )
              }
            />

            <Input
              label="欄位分隔符號（預設為 Tab）"
              placeholder="預設為 Tab"
              value={separator}
              className="flex-1"
              onChange={(e) => onSeparatorChange(e.target.value)}
            />
          </div>

          {/* 生成按鈕 */}
          <Button
            color="primary"
            size="lg"
            className="w-full"
            onPress={onGenerate}
          >
            生成資料
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
