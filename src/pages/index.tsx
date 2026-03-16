import { useState } from "react";
import { Alert } from "@heroui/alert";

import DefaultLayout from "@/layouts/default";
import { GeneratorForm } from "@/components/generator/GeneratorForm";
import { FieldSelector } from "@/components/generator/FieldSelector";
import { DataTable } from "@/components/generator/DataTable";
import { generateMultipleData } from "@/utils/generators";

import type { FakeData, Gender, IdType, FieldConfig } from "@/types/generator";

export default function IndexPage() {
  const [data, setData] = useState<FakeData[]>([]);
  const [separator, setSeparator] = useState<string>("\t");
  const [fields, setFields] = useState<FieldConfig[]>([
    { key: 'taiwanName', label: '台灣姓名', enabled: true },
    { key: 'englishName', label: '英文姓名', enabled: true },
    { key: 'idNumber', label: '證件號碼', enabled: true },
    { key: 'zipCode', label: '郵遞區號', enabled: true },
    { key: 'address', label: '地址', enabled: true },
    { key: 'phone', label: '手機', enabled: true },
  ]);

  const handleGenerate = (
    gender: Gender,
    idType: IdType,
    count: number,
    sep: string,
  ) => {
    const generatedData = generateMultipleData({
      gender,
      idType,
      count,
      separator: sep,
    });
    setData(generatedData);
    setSeparator(sep);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="w-full max-w-screen-xl px-6">
          <div className="flex flex-col gap-6">
            <GeneratorForm onGenerate={handleGenerate} />
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
