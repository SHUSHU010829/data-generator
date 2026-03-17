/**
 * 台灣常見的電子郵件服務商網域
 */
const EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com.tw',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
] as const;

/**
 * 生成隨機電子郵件地址
 * @param englishName - 英文姓名（格式：First Last）
 * @returns 電子郵件地址
 */
export function generateEmail(englishName: string): string {
  // 解析英文姓名
  const parts = englishName.toLowerCase().split(' ');
  const firstName = parts[0] || 'user';
  const lastName = parts[1] || 'name';

  // 隨機選擇電子郵件地址格式
  const formats = [
    `${firstName}.${lastName}`,           // john.doe
    `${firstName}${lastName}`,            // johndoe
    `${firstName}_${lastName}`,           // john_doe
    `${firstName}${Math.floor(Math.random() * 1000)}`, // john123
    `${lastName}.${firstName}`,           // doe.john
  ];

  const randomFormat = formats[Math.floor(Math.random() * formats.length)];

  // 隨機選擇網域
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];

  return `${randomFormat}@${domain}`;
}
