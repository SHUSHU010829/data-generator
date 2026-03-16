// 台灣地址資料結構
export interface DistrictData {
  name: string;
  zipCode: string;
}

export interface AddressData {
  city: string;
  districts: DistrictData[];
}

// 台灣縣市和區域資料（含郵遞區號）
export const taiwanAddresses: AddressData[] = [
  {
    city: '台北市',
    districts: [
      { name: '中正區', zipCode: '100' },
      { name: '大同區', zipCode: '103' },
      { name: '中山區', zipCode: '104' },
      { name: '松山區', zipCode: '105' },
      { name: '大安區', zipCode: '106' },
      { name: '萬華區', zipCode: '108' },
      { name: '信義區', zipCode: '110' },
      { name: '士林區', zipCode: '111' },
      { name: '北投區', zipCode: '112' },
      { name: '內湖區', zipCode: '114' },
      { name: '南港區', zipCode: '115' },
      { name: '文山區', zipCode: '116' },
    ],
  },
  {
    city: '新北市',
    districts: [
      { name: '板橋區', zipCode: '220' },
      { name: '三重區', zipCode: '241' },
      { name: '中和區', zipCode: '235' },
      { name: '永和區', zipCode: '234' },
      { name: '新莊區', zipCode: '242' },
      { name: '新店區', zipCode: '231' },
      { name: '樹林區', zipCode: '238' },
      { name: '鶯歌區', zipCode: '239' },
      { name: '三峽區', zipCode: '237' },
      { name: '淡水區', zipCode: '251' },
      { name: '汐止區', zipCode: '221' },
      { name: '瑞芳區', zipCode: '224' },
    ],
  },
  {
    city: '桃園市',
    districts: [
      { name: '桃園區', zipCode: '330' },
      { name: '中壢區', zipCode: '320' },
      { name: '平鎮區', zipCode: '324' },
      { name: '八德區', zipCode: '334' },
      { name: '楊梅區', zipCode: '326' },
      { name: '蘆竹區', zipCode: '338' },
      { name: '大溪區', zipCode: '335' },
      { name: '龍潭區', zipCode: '325' },
      { name: '龜山區', zipCode: '333' },
      { name: '大園區', zipCode: '337' },
      { name: '觀音區', zipCode: '328' },
      { name: '新屋區', zipCode: '327' },
    ],
  },
  {
    city: '台中市',
    districts: [
      { name: '中區', zipCode: '400' },
      { name: '東區', zipCode: '401' },
      { name: '南區', zipCode: '402' },
      { name: '西區', zipCode: '403' },
      { name: '北區', zipCode: '404' },
      { name: '北屯區', zipCode: '406' },
      { name: '西屯區', zipCode: '407' },
      { name: '南屯區', zipCode: '408' },
      { name: '太平區', zipCode: '411' },
      { name: '大里區', zipCode: '412' },
      { name: '霧峰區', zipCode: '413' },
      { name: '烏日區', zipCode: '414' },
    ],
  },
  {
    city: '台南市',
    districts: [
      { name: '中西區', zipCode: '700' },
      { name: '東區', zipCode: '701' },
      { name: '南區', zipCode: '702' },
      { name: '北區', zipCode: '704' },
      { name: '安平區', zipCode: '708' },
      { name: '安南區', zipCode: '709' },
      { name: '永康區', zipCode: '710' },
      { name: '歸仁區', zipCode: '711' },
      { name: '新化區', zipCode: '712' },
      { name: '左鎮區', zipCode: '713' },
      { name: '玉井區', zipCode: '714' },
      { name: '楠西區', zipCode: '715' },
    ],
  },
  {
    city: '高雄市',
    districts: [
      { name: '新興區', zipCode: '800' },
      { name: '前金區', zipCode: '801' },
      { name: '苓雅區', zipCode: '802' },
      { name: '鹽埕區', zipCode: '803' },
      { name: '鼓山區', zipCode: '804' },
      { name: '旗津區', zipCode: '805' },
      { name: '前鎮區', zipCode: '806' },
      { name: '三民區', zipCode: '807' },
      { name: '楠梓區', zipCode: '811' },
      { name: '小港區', zipCode: '812' },
      { name: '左營區', zipCode: '813' },
      { name: '仁武區', zipCode: '814' },
    ],
  },
];

// 常見路名
export const streetNames = [
  '中山路', '中正路', '民生路', '民權路', '中華路', '八德路', '仁愛路', '信義路', '和平路', '建國路',
  '復興路', '光復路', '忠孝路', '博愛路', '三民路', '四維路', '五福路', '六合路', '七賢路', '九如路',
];

// 常見巷弄號
export const lanes = [1, 2, 3, 5, 7, 10, 12, 15, 18, 20, 25, 30, 35, 40, 45, 50];
export const alleyNumbers = [1, 2, 3, 5, 7, 10, 12, 15, 18, 20];
export const houseNumbers = Array.from({ length: 200 }, (_, i) => i + 1);
