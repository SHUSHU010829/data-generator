/**
 * 台灣血型分布權重（依台灣捐血中心概略統計）
 * O 44% / A 26% / B 24% / AB 6%
 */
const BLOOD_TYPE_WEIGHTS = [
  { type: 'O', weight: 44 },
  { type: 'A', weight: 26 },
  { type: 'B', weight: 24 },
  { type: 'AB', weight: 6 },
] as const;

// 權重總和（供加權隨機使用）
const TOTAL_WEIGHT = BLOOD_TYPE_WEIGHTS.reduce((sum, item) => sum + item.weight, 0);

/**
 * 依台灣真實分布加權生成血型
 * @returns 血型字串（A、B、O、AB）
 */
export function generateBloodType(): string {
  let random = Math.random() * TOTAL_WEIGHT;

  for (const { type, weight } of BLOOD_TYPE_WEIGHTS) {
    if (random < weight) return type;
    random -= weight;
  }

  // 浮點誤差保底，理論上不會執行到
  return 'O';
}
