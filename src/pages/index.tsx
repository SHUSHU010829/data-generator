import { useState } from "react";
import { Alert } from "@heroui/alert";

import DefaultLayout from "@/layouts/default";
import { GeneratorForm } from "@/components/generator/GeneratorForm";
import { FieldSelector } from "@/components/generator/FieldSelector";
import { DataTable } from "@/components/generator/DataTable";
import { generateMultipleData } from "@/utils/generators";

import type { FakeData, Gender, FieldConfig } from "@/types/generator";

export default function IndexPage() {
  const [data, setData] = useState<FakeData[]>([]);
  const [gender, setGender] = useState<Gender>("random");
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>("\t");
  const [fields, setFields] = useState<FieldConfig[]>([
    { key: 'taiwanName', label: '台灣姓名', enabled: true },
    { key: 'englishName', label: '英文姓名', enabled: false },
    {
      key: 'idNumber',
      label: '證件號碼',
      enabled: true,
      options: { idType: 'random' }
    },
    { key: 'zipCode', label: '郵遞區號', enabled: true },
    { key: 'address', label: '地址', enabled: true },
    { key: 'phone', label: '手機', enabled: true },
    {
      key: 'birthday',
      label: '生日',
      enabled: false,
      options: { yearFormat: 'western' }
    },
    { key: 'bloodType', label: '血型', enabled: false },
    { key: 'email', label: '信箱', enabled: true },
  ]);

  const handleGenerate = () => {
    // 從 fields 取得證件類型和年份格式
    const idNumberField = fields.find(f => f.key === 'idNumber');
    const birthdayField = fields.find(f => f.key === 'birthday');

    const idType = idNumberField?.options?.idType || 'random';
    const yearFormat = birthdayField?.options?.yearFormat || 'western';

    const generatedData = generateMultipleData({
      gender,
      idType,
      count,
      separator,
      yearFormat,
    });
    setData(generatedData);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="w-full max-w-screen-xl px-6">
          <div className="flex flex-col gap-6">
            <GeneratorForm
              gender={gender}
              count={count}
              separator={separator}
              onGenderChange={setGender}
              onCountChange={setCount}
              onSeparatorChange={setSeparator}
              onGenerate={handleGenerate}
            />
            <FieldSelector fields={fields} onFieldsChange={setFields} />
            <DataTable data={data} separator={separator} fields={fields} />
          </div>
        </div>

        <div className="w-full max-w-screen-xl px-6">
          <Alert
            color="warning"
            variant="flat"
            title="使用須知"
            description="所有資料皆隨機模擬生成，並非真實數據，且僅限用於格式學習、參考以及開發測試，請不要用於非法用途且用戶不應過度信賴網站內容，本網站不負任何法律責任，特此聲明。"
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
