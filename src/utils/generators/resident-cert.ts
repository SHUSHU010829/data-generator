// 台灣居留證號碼生成器

import type { ResidentCertType } from '../../types/generator';
import { cityCodeMap, cityCodes, oldResidentCertSecondLetterMap } from '../../data/id-mappings';
import { random } from '../random';

/**
 * 計算舊版居留證檢查碼
 * @param certPrefix - 前 9 碼（2 個字母 + 7 個數字）
 * @returns 檢查碼（0-9）
 */
function calculateOldCheckDigit(certPrefix: string): number {
  const firstCode = cityCodeMap[certPrefix[0]];
  const secondCode = oldResidentCertSecondLetterMap[certPrefix[1]];

  const d1 = Math.floor(firstCode / 10);
  const d2 = firstCode % 10;
  const d3 = Math.floor(secondCode / 10);
  const d4 = secondCode % 10;

  // 權重: [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  let sum = d1 * 1 + d2 * 9 + d3 * 8 + d4 * 7;

  for (let i = 2; i < 9; i++) {
    sum += parseInt(certPrefix[i]) * (9 - i);
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit;
}

/**
 * 計算新版居留證檢查碼（與身分證相同）
 * @param certPrefix - 前 9 碼（字母 + 8 個數字）
 * @returns 檢查碼（0-9）
 */
function calculateNewCheckDigit(certPrefix: string): number {
  const cityCode = cityCodeMap[certPrefix[0]];
  const d1 = Math.floor(cityCode / 10);
  const d2 = cityCode % 10;

  let sum = d1 * 1 + d2 * 9;

  for (let i = 1; i < 9; i++) {
    sum += parseInt(certPrefix[i]) * (9 - i);
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit;
}

/**
 * 生成台灣居留證號碼
 * @param gender - 性別 ('male' 或 'female')
 * @param type - 居留證類型 ('old' 或 'new')
 * @returns 居留證號碼（10 碼）
 */
export function generateResidentCert(
  gender: 'male' | 'female',
  type: ResidentCertType
): string {
  const cityCode = cityCodes[Math.floor(random() * cityCodes.length)];

  if (type === 'old') {
    // 舊版：第二碼為 A/C (男) 或 B/D (女)
    const secondLetter = gender === 'male'
      ? (random() < 0.5 ? 'A' : 'C')
      : (random() < 0.5 ? 'B' : 'D');

    // 生成 7 個隨機數字
    let randomDigits = '';
    for (let i = 0; i < 7; i++) {
      randomDigits += Math.floor(random() * 10);
    }

    const certPrefix = cityCode + secondLetter + randomDigits;
    const checkDigit = calculateOldCheckDigit(certPrefix);

    return certPrefix + checkDigit;
  } else {
    // 新版：第二碼為 8 (男) 或 9 (女)
    const genderCode = gender === 'male' ? '8' : '9';

    // 生成 7 個隨機數字
    let randomDigits = '';
    for (let i = 0; i < 7; i++) {
      randomDigits += Math.floor(random() * 10);
    }

    const certPrefix = cityCode + genderCode + randomDigits;
    const checkDigit = calculateNewCheckDigit(certPrefix);

    return certPrefix + checkDigit;
  }
}
