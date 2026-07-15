import { random } from '../random';

/**
 * RFC 2606 保留網域
 * 這些網域由 IANA 保留給文件與測試用途，永遠不會路由到真實信箱，
 * 可避免測試信誤寄給真人或造成退信被郵件系統攔截。
 */
const EMAIL_DOMAINS = [
  'example.com',
  'example.net',
  'example.org',
] as const;

/**
 * 生成隨機電子郵件地址
 * @param englishName - 英文姓名（格式：First Last）
 * @returns 電子郵件地址
 */
export function generateEmail(englishName: string): string {
  // 解析英文姓名（去除拼音連字號，例如 yi-chun → yichun）
  const parts = englishName.toLowerCase().replace(/-/g, '').split(' ');
  const firstName = parts[0] || 'user';
  const lastName = parts[1] || 'name';

  // 隨機選擇電子郵件地址格式
  const formats = [
    `${firstName}.${lastName}`,           // john.doe
    `${firstName}${lastName}`,            // johndoe
    `${firstName}_${lastName}`,           // john_doe
    `${firstName}${Math.floor(random() * 1000)}`, // john123
    `${lastName}.${firstName}`,           // doe.john
  ];

  const randomFormat = formats[Math.floor(random() * formats.length)];

  // 隨機選擇網域
  const domain = EMAIL_DOMAINS[Math.floor(random() * EMAIL_DOMAINS.length)];

  return `${randomFormat}@${domain}`;
}
