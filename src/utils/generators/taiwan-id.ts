// 台灣身分證字號生成器

import { cityCodeMap, cityCodes } from '../../data/id-mappings';

/**
 * 計算身分證檢查碼
 * @param idPrefix - 前 9 碼（字母 + 8 個數字）
 * @returns 檢查碼（0-9）
 */
function calculateCheckDigit(idPrefix: string): number {
  const cityCode = cityCodeMap[idPrefix[0]];
  const d1 = Math.floor(cityCode / 10); // 十位數
  const d2 = cityCode % 10; // 個位數

  // 權重: [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  let sum = d1 * 1 + d2 * 9;

  for (let i = 1; i < 9; i++) {
    sum += parseInt(idPrefix[i]) * (9 - i);
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit;
}

/**
 * 生成台灣身分證字號
 * @param gender - 性別 ('male' 或 'female')
 * @returns 身分證字號（10 碼）
 */
export function generateTaiwanId(gender: 'male' | 'female'): string {
  // 隨機選擇縣市代碼
  const cityCode = cityCodes[Math.floor(Math.random() * cityCodes.length)];

  // 性別碼：1=男性, 2=女性
  const genderCode = gender === 'male' ? '1' : '2';

  // 生成 7 個隨機數字
  let randomDigits = '';
  for (let i = 0; i < 7; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }

  // 組合前 9 碼
  const idPrefix = cityCode + genderCode + randomDigits;

  // 計算檢查碼
  const checkDigit = calculateCheckDigit(idPrefix);

  return idPrefix + checkDigit;
}
