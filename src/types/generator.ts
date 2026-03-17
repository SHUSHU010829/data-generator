// 性別類型
export type Gender = 'male' | 'female' | 'random';

// 證件類型
export type IdType = 'nationalId' | 'residentCert' | 'random';

// 年份格式類型
export type YearFormat = 'western' | 'minguo';

// 居留證類型（內部使用）
export type ResidentCertType = 'old' | 'new';

// 生成器設定
export interface GeneratorConfig {
  gender: Gender;
  idType: IdType;
  count: number;
  separator: string; // 欄位分隔符號
  yearFormat: YearFormat; // 年份格式（西元年或民國年）
}

// 可選欄位類型
export type FieldType =
  | 'taiwanName'
  | 'englishName'
  | 'idNumber'
  | 'zipCode'
  | 'address'
  | 'phone'
  | 'birthday'
  | 'bloodType'
  | 'email';

// 欄位設定
export interface FieldConfig {
  key: FieldType;
  label: string;
  enabled: boolean;
  options?: {
    // 證件號碼欄位的選項
    idType?: IdType;
    // 生日欄位的選項
    yearFormat?: YearFormat;
  };
}

// 生成的假資料
export interface FakeData {
  taiwanName: string;
  englishName: string;
  idNumber: string; // 身分證或居留證號碼（擇一）
  zipCode: string;
  address: string;
  phone: string;
  birthday: string; // 生日（格式依據 yearFormat）
  bloodType: string; // 血型
  email: string; // 電子郵件
  gender: 'male' | 'female'; // 實際性別（不含 random）
}
