import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

import type { Gender } from "@/types/generator";

interface GeneratorFormProps {
  gender: Gender;
  count: number;
  separator: string;
  includeId: boolean;
  onGenderChange: (gender: Gender) => void;
  onCountChange: (count: number) => void;
  onSeparatorChange: (separator: string) => void;
  onIncludeIdChange: (includeId: boolean) => void;
  onGenerate: () => void;
}

export function GeneratorForm({
  gender,
  count,
  separator,
  includeId,
  onGenderChange,
  onCountChange,
  onSeparatorChange,
  onIncludeIdChange,
  onGenerate,
}: GeneratorFormProps) {
  return (
    <Card className="w-full p-2">
      <CardBody>
        <div className="flex flex-col gap-4">
          {/* 第一排：性別、生成數量 */}
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
          </div>

          {/* 第二排：分隔符號、流水編號 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              label="欄位分隔符號（預設為空白）"
              placeholder="預設為空白"
              value={separator}
              className="flex-1"
              onChange={(e) => onSeparatorChange(e.target.value)}
            />

            <Select
              label="流水編號"
              placeholder="選擇是否包含"
              selectedKeys={[includeId ? "true" : "false"]}
              className="flex-1"
              onChange={(e) => onIncludeIdChange(e.target.value === "true")}
            >
              <SelectItem key="false">不包含</SelectItem>
              <SelectItem key="true">包含流水編號</SelectItem>
            </Select>
          </div>

          {/* 使用須知 */}
          <Alert
            color="warning"
            variant="flat"
            title="使用須知"
            description="所有資料皆隨機模擬生成，並非真實數據，且僅限用於格式學習、參考以及開發測試，請不要用於非法用途且用戶不應過度信賴網站內容，本網站不負任何法律責任，特此聲明。"
          />

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
