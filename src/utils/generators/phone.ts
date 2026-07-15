// 手機號碼生成器

import { random } from '../random';

// 台灣電信業者前綴（09XX）
const carriers = [
  '0910', '0911', '0912', '0913', '0916', '0917', '0918', '0919', // 中華電信
  '0920', '0921', '0922', '0923', '0928', '0929',                 // 台灣大哥大
  '0930', '0931', '0932', '0933', '0934', '0937', '0938', '0939', // 遠傳電信
  '0905', '0906', '0907', '0908', '0909',                         // 台灣之星
  '0903', '0904',                                                 // 亞太電信
];

/**
 * 從陣列中隨機選擇一個元素
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(random() * array.length)];
}

/**
 * 生成台灣手機號碼
 * @returns 手機號碼（10 位數字）
 */
export function generatePhone(): string {
  const prefix = randomChoice(carriers);

  // 生成後 6 碼
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += Math.floor(random() * 10);
  }

  // 返回 10 位數字（不含分隔符號）
  return `${prefix}${suffix}`;
}
