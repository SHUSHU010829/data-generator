// 可設種子的偽隨機數產生器（PRNG）
//
// 演算法：xmur3（字串雜湊）+ mulberry32（32-bit PRNG），皆為公開領域實作。
// 設定種子後，隨機序列可重現 → 相同種子產生同一批資料；
// 未設定種子時退回系統 Math.random()，維持每次隨機的原有行為。

/**
 * xmur3 字串雜湊：將種子字串轉為 32-bit 整數種子
 */
function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

/**
 * mulberry32：由 32-bit 整數種子產生 [0, 1) 隨機序列
 */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 目前使用的亂數函式；null 代表使用系統隨機
let rng: (() => number) | null = null;

/**
 * 設定亂數種子
 * @param seed - 種子字串；傳入 undefined 或空字串則回到系統隨機
 */
export function setSeed(seed?: string): void {
  if (!seed) {
    rng = null;
    return;
  }
  const seedGen = xmur3(seed);
  rng = mulberry32(seedGen());
}

/**
 * 取得 [0, 1) 隨機浮點數
 * 已設種子時為可重現序列，否則等同 Math.random()
 */
export function random(): number {
  return rng ? rng() : Math.random();
}
