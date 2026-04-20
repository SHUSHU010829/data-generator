import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { GeneratorForm } from "@/components/generator/GeneratorForm";
import { FieldSelector } from "@/components/generator/FieldSelector";
import { DataTable } from "@/components/generator/DataTable";
import { generateMultipleData } from "@/utils/generators";
import { useHotkeys } from "@/hooks/useHotkeys";

import type { FakeData, Gender, FieldConfig } from "@/types/generator";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  }),
};

export default function IndexPage() {
  const [data, setData] = useState<FakeData[]>([]);
  const [gender, setGender] = useState<Gender>("random");
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>(" ");
  const [includeId, setIncludeId] = useState<boolean>(false);
  const [fields, setFields] = useState<FieldConfig[]>([
    { key: 'taiwanName', label: '中文姓名', enabled: true, jsonKey: 'name' },
    { key: 'englishName', label: '英文姓名', enabled: false, jsonKey: 'englishName' },
    { key: 'idNumber', label: '證件號碼', enabled: true, jsonKey: 'idNumber', options: { idType: 'nationalId' } },
    { key: 'zipCode', label: '郵遞區號', enabled: true, jsonKey: 'zipCode' },
    { key: 'address', label: '地址', enabled: true, jsonKey: 'address' },
    { key: 'phone', label: '手機', enabled: true, jsonKey: 'phone' },
    { key: 'birthday', label: '生日', enabled: false, jsonKey: 'birthday', options: { yearFormat: 'western' } },
    { key: 'bloodType', label: '血型', enabled: false, jsonKey: 'bloodType' },
    { key: 'email', label: '信箱', enabled: true, jsonKey: 'email' },
  ]);

  const enabledFieldCount = useMemo(() => fields.filter((f) => f.enabled).length, [fields]);

  const handleGenerate = () => {
    const idNumberField = fields.find(f => f.key === 'idNumber');
    const birthdayField = fields.find(f => f.key === 'birthday');
    const generatedData = generateMultipleData({
      gender,
      idType: idNumberField?.options?.idType || 'random',
      count,
      separator,
      yearFormat: birthdayField?.options?.yearFormat || 'western',
    });
    setData(generatedData);
  };

  // Cmd/Ctrl + Enter 快捷鍵
  useHotkeys('mod+enter', handleGenerate);

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4 sm:gap-5">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
          <GeneratorForm
            gender={gender}
            count={count}
            separator={separator}
            includeId={includeId}
            enabledFieldCount={enabledFieldCount}
            onGenderChange={setGender}
            onCountChange={setCount}
            onSeparatorChange={setSeparator}
            onIncludeIdChange={setIncludeId}
            onGenerate={handleGenerate}
          />
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <FieldSelector fields={fields} onFieldsChange={setFields} />
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
          <DataTable data={data} separator={separator} fields={fields} includeId={includeId} />
        </motion.div>
      </section>
    </DefaultLayout>
  );
}
