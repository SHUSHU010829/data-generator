// 生成器統一匯出

import type { FakeData, GeneratorConfig } from '../../types/generator';
import { random, setSeed } from '../random';
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
      ? (random() < 0.5 ? 'male' : 'female')
      : config.gender;

  const { zipCode, address } = generateAddress();

  // 根據證件類型生成對應的號碼
  let idNumber: string;

  // 決定實際證件類型
  let actualIdType = config.idType;
  if (config.idType === 'random') {
    // 隨機時：90% 身分證，10% 居留證
    actualIdType = random() < 0.9 ? 'nationalId' : 'residentCert';
  }

  if (actualIdType === 'nationalId') {
    idNumber = generateTaiwanId(actualGender);
  } else {
    // 居留證：隨機選擇新版或舊版
    const certType = random() < 0.5 ? 'new' : 'old';
    idNumber = generateResidentCert(actualGender, certType);
  }

  const taiwanName = generateTaiwanName(actualGender);
  // 英文名由中文姓名拼音衍生，維持三者一致
  const englishName = generateEnglishName(taiwanName);

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
    isForeigner: actualIdType === 'residentCert',
  };
}

/**
 * 取得單筆資料的唯一性鍵（身分證、手機、email 三個常作為主鍵的欄位）
 */
function uniqueKeysOf(data: FakeData): string[] {
  return [`id:${data.idNumber}`, `phone:${data.phone}`, `email:${data.email}`];
}

/**
 * 生成多筆假資料
 *
 * 對身分證、手機、email 做去重，避免大量產生時碰撞（這些欄位常被當成
 * 資料庫主鍵）。姓名等欄位不強制唯一，因真實世界本就會重複。
 *
 * @param config - 生成器設定
 * @returns 假資料陣列
 */
export function generateMultipleData(config: GeneratorConfig): FakeData[] {
  // 設定亂數種子：有種子則本批可重現，留空則每次隨機
  setSeed(config.seed);

  const results: FakeData[] = [];
  const seen = new Set<string>();
  const MAX_RETRY = 50; // 重試上限，避免極端情況（資料池耗盡）無限迴圈

  for (let i = 0; i < config.count; i++) {
    let data = generateSingleData(config);

    // 任一關鍵欄位已出現過就重新生成，直到唯一或達重試上限
    let retry = 0;
    while (retry < MAX_RETRY && uniqueKeysOf(data).some((key) => seen.has(key))) {
      data = generateSingleData(config);
      retry++;
    }

    uniqueKeysOf(data).forEach((key) => seen.add(key));
    results.push(data);
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
