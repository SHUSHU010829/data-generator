/**
 * 可能的血型類型
 */
const BLOOD_TYPES = ['A', 'B', 'O', 'AB'] as const;

/**
 * 生成隨機血型
 * @returns 血型字串（A、B、O、AB）
 */
export function generateBloodType(): string {
  const randomIndex = Math.floor(Math.random() * BLOOD_TYPES.length);
  return BLOOD_TYPES[randomIndex];
}
