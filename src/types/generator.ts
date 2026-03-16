// 性別類型
export type Gender = 'male' | 'female' | 'random';

// 證件類型
export type IdType = 'nationalId' | 'residentCert' | 'random';

// 居留證類型（內部使用）
export type ResidentCertType = 'old' | 'new';

// 生成器設定
export interface GeneratorConfig {
  gender: Gender;
  idType: IdType;
  count: number;
  separator: string; // 欄位分隔符號
}

// 可選欄位類型
export type FieldType =
  | 'taiwanName'
  | 'englishName'
  | 'idNumber'
  | 'zipCode'
  | 'address'
  | 'phone';

// 欄位設定
export interface FieldConfig {
  key: FieldType;
  label: string;
  enabled: boolean;
}

// 生成的假資料
export interface FakeData {
  taiwanName: string;
  englishName: string;
  idNumber: string; // 身分證或居留證號碼（擇一）
  zipCode: string;
  address: string;
  phone: string;
  gender: 'male' | 'female'; // 實際性別（不含 random）
}
