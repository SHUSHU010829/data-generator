// 姓名生成器

import { surnames, maleGivenNames, femaleGivenNames } from '../../data/taiwan-names';
import { charToRomanization } from '../../data/name-romanization';

/**
 * 從陣列中隨機選擇一個元素
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 將單一漢字轉為威妥瑪拼音音節（首字母大寫）
 * 找不到對應時回傳原字，避免產生 undefined
 */
function romanizeChar(char: string): string {
  return charToRomanization[char] ?? char;
}

/**
 * 生成台灣姓名
 * @param gender - 性別 ('male' 或 'female')
 * @returns 台灣姓名
 */
export function generateTaiwanName(gender: 'male' | 'female'): string {
  const surname = randomChoice(surnames);
  const givenName = gender === 'male'
    ? randomChoice(maleGivenNames)
    : randomChoice(femaleGivenNames);

  return surname + givenName;
}

/**
 * 由中文姓名衍生英文拼音姓名
 *
 * 姓氏取第一個字，名字取其餘字（本專案姓氏皆為單字）。
 * 名字多字時以連字號串接，例如「陳怡君」→「Yi-Chun Chen」。
 * 讓中文名、英文名、email 三者保持一致。
 *
 * @param chineseName - 中文姓名（如「陳怡君」）
 * @returns 英文姓名（First Last，如「Yi-Chun Chen」）
 */
export function generateEnglishName(chineseName: string): string {
  const chars = [...chineseName];
  const surname = romanizeChar(chars[0]);
  const givenName = chars
    .slice(1)
    .map(romanizeChar)
    .join('-');

  return `${givenName} ${surname}`;
}
