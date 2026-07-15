import type { YearFormat } from '../../types/generator';
import { random } from '../random';

/**
 * 生成隨機生日
 * @param yearFormat - 年份格式（西元年或民國年）
 * @returns 生日字串（格式：YYYY/MM/DD 或 YY/MM/DD）
 */
export function generateBirthday(yearFormat: YearFormat = 'western'): string {
  // 生成 18-65 歲之間的隨機生日
  const currentYear = new Date().getFullYear();
  const minAge = 18;
  const maxAge = 65;

  // 計算出生年份範圍
  const minYear = currentYear - maxAge;
  const maxYear = currentYear - minAge;

  // 隨機生成年份
  const year = Math.floor(random() * (maxYear - minYear + 1)) + minYear;

  // 隨機生成月份 (1-12)
  const month = Math.floor(random() * 12) + 1;

  // 根據月份決定天數
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(random() * daysInMonth) + 1;

  // 格式化月份和日期（補零）
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');

  // 根據年份格式返回對應的生日字串
  if (yearFormat === 'minguo') {
    // 民國年 = 西元年 - 1911
    const minguoYear = year - 1911;
    return `${minguoYear}/${monthStr}/${dayStr}`;
  } else {
    // 西元年
    return `${year}/${monthStr}/${dayStr}`;
  }
}
