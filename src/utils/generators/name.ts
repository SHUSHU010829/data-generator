// 姓名生成器

import { surnames, maleGivenNames, femaleGivenNames } from '../../data/taiwan-names';
import { maleFirstNames, femaleFirstNames, lastNames } from '../../data/english-names';

/**
 * 從陣列中隨機選擇一個元素
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
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
 * 生成英文姓名
 * @param gender - 性別 ('male' 或 'female')
 * @returns 英文姓名（First Last）
 */
export function generateEnglishName(gender: 'male' | 'female'): string {
  const firstName = gender === 'male'
    ? randomChoice(maleFirstNames)
    : randomChoice(femaleFirstNames);
  const lastName = randomChoice(lastNames);

  return `${firstName} ${lastName}`;
}
