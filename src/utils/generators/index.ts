// 生成器統一匯出

import type { FakeData, GeneratorConfig } from '../../types/generator';
import { generateTaiwanId } from './taiwan-id';
import { generateResidentCert } from './resident-cert';
import { generateTaiwanName, generateEnglishName } from './name';
import { generateAddress } from './address';
import { generatePhone } from './phone';
import { generateBirthday } from './birthday';
import { generateBloodType } from './blood-type';
import { generateEmail } from './email';

/**
 * 生成單筆假資料
 * @param config - 生成器設定
 * @returns 假資料物件
 */
export function generateSingleData(config: GeneratorConfig): FakeData {
  // 決定實際性別
  const actualGender: 'male' | 'female' =
    config.gender === 'random'
      ? (Math.random() < 0.5 ? 'male' : 'female')
      : config.gender;

  const { zipCode, address } = generateAddress();

  // 根據證件類型生成對應的號碼
  let idNumber: string;

  // 決定實際證件類型
  let actualIdType = config.idType;
  if (config.idType === 'random') {
    // 隨機時：90% 身分證，10% 居留證
    actualIdType = Math.random() < 0.9 ? 'nationalId' : 'residentCert';
  }

  if (actualIdType === 'nationalId') {
    idNumber = generateTaiwanId(actualGender);
  } else {
    // 居留證：隨機選擇新版或舊版
    const certType = Math.random() < 0.5 ? 'new' : 'old';
    idNumber = generateResidentCert(actualGender, certType);
  }

  const taiwanName = generateTaiwanName(actualGender);
  const englishName = generateEnglishName(actualGender);

  return {
    taiwanName,
    englishName,
    idNumber,
    zipCode,
    address,
    phone: generatePhone(),
    birthday: generateBirthday(config.yearFormat),
    bloodType: generateBloodType(),
    email: generateEmail(englishName),
    gender: actualGender,
  };
}

/**
 * 生成多筆假資料
 * @param config - 生成器設定
 * @returns 假資料陣列
 */
export function generateMultipleData(config: GeneratorConfig): FakeData[] {
  const results: FakeData[] = [];

  for (let i = 0; i < config.count; i++) {
    results.push(generateSingleData(config));
  }

  return results;
}

// 匯出個別生成器供單獨使用
export { generateTaiwanId } from './taiwan-id';
export { generateResidentCert } from './resident-cert';
export { generateTaiwanName, generateEnglishName } from './name';
export { generateAddress } from './address';
export { generatePhone } from './phone';
export { generateBirthday } from './birthday';
export { generateBloodType } from './blood-type';
export { generateEmail } from './email';
