// 地址生成器

import { taiwanAddresses, streetNames, lanes, alleyNumbers, houseNumbers } from '../../data/taiwan-addresses';

/**
 * 從陣列中隨機選擇一個元素
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 生成台灣地址
 * @returns 包含郵遞區號和地址的物件
 */
export function generateAddress(): { zipCode: string; address: string } {
  const addressData = randomChoice(taiwanAddresses);
  const district = randomChoice(addressData.districts);
  const street = randomChoice(streetNames);

  // 60% 機率有巷
  const hasLane = Math.random() < 0.6;
  let address = `${addressData.city}${district.name}${street}`;

  if (hasLane) {
    const lane = randomChoice(lanes);
    address += `${lane}巷`;

    // 40% 機率有弄
    const hasAlley = Math.random() < 0.4;
    if (hasAlley) {
      const alley = randomChoice(alleyNumbers);
      address += `${alley}弄`;
    }
  }

  const houseNumber = randomChoice(houseNumbers);
  address += `${houseNumber}號`;

  // 30% 機率有樓層
  if (Math.random() < 0.3) {
    const floor = Math.floor(Math.random() * 12) + 1;
    address += `${floor}樓`;
  }

  return {
    zipCode: district.zipCode,
    address,
  };
}
