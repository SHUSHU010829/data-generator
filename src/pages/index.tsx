import { useState } from "react";

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
  const [separator, setSeparator] = useState<string>(" ");
  const [includeId, setIncludeId] = useState<boolean>(false);
  const [fields, setFields] = useState<FieldConfig[]>([
    { key: 'taiwanName', label: '中文姓名', enabled: true, jsonKey: 'name' },
    { key: 'englishName', label: '英文姓名', enabled: false, jsonKey: 'englishName' },
    {
      key: 'idNumber',
      label: '證件號碼',
      enabled: true,
      jsonKey: 'idNumber',
      options: { idType: 'nationalId' }
    },
    { key: 'zipCode', label: '郵遞區號', enabled: true, jsonKey: 'zipCode' },
    { key: 'address', label: '地址', enabled: true, jsonKey: 'address' },
    { key: 'phone', label: '手機', enabled: true, jsonKey: 'phone' },
    {
      key: 'birthday',
      label: '生日',
      enabled: false,
      jsonKey: 'birthday',
      options: { yearFormat: 'western' }
    },
    { key: 'bloodType', label: '血型', enabled: false, jsonKey: 'bloodType' },
    { key: 'email', label: '信箱', enabled: true, jsonKey: 'email' },
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
      <section className="flex flex-col items-center justify-center gap-4 sm:gap-6">
        <div className="w-full max-w-screen-xl">
          <div className="flex flex-col gap-4 sm:gap-6">
            <GeneratorForm
              gender={gender}
              count={count}
              separator={separator}
              includeId={includeId}
              onGenderChange={setGender}
              onCountChange={setCount}
              onSeparatorChange={setSeparator}
              onIncludeIdChange={setIncludeId}
              onGenerate={handleGenerate}
            />
            <FieldSelector fields={fields} onFieldsChange={setFields} />
            <DataTable data={data} separator={separator} fields={fields} includeId={includeId} />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
