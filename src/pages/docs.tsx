import { Card, CardBody, CardHeader } from "@heroui/card";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="w-full max-w-screen-xl px-6">
          <Card className="w-full p-2">
            <CardHeader>
              <h1 className="text-3xl font-bold">驗證邏輯文件</h1>
            </CardHeader>
            <CardBody className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-default-500 mb-6">
                本文件記錄所有生成資料的格式規範和驗證邏輯。
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">📋 目錄</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><a href="#id-card" className="text-primary hover:underline">身分證字號</a></li>
                  <li><a href="#resident-cert" className="text-primary hover:underline">居留證號碼</a></li>
                  <li><a href="#taiwan-name" className="text-primary hover:underline">台灣姓名</a></li>
                  <li><a href="#english-name" className="text-primary hover:underline">英文姓名</a></li>
                  <li><a href="#zip-code" className="text-primary hover:underline">郵遞區號</a></li>
                  <li><a href="#address" className="text-primary hover:underline">地址</a></li>
                  <li><a href="#phone" className="text-primary hover:underline">手機號碼</a></li>
                </ul>
              </section>

              <section id="id-card" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">身分證字號</h2>

                <h3 className="text-xl font-semibold mb-3">格式規範</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>長度</strong>：10 碼</li>
                  <li><strong>格式</strong>：X1XXXXXXXX
                    <ul className="list-circle list-inside ml-6 mt-2">
                      <li>第 1 碼：英文字母（縣市代碼）</li>
                      <li>第 2 碼：數字 1 或 2（性別碼）</li>
                      <li>第 3-9 碼：7 位隨機數字</li>
                      <li>第 10 碼：檢查碼</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">性別碼規則</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><code className="bg-default-100 px-2 py-1 rounded">1</code> = 男性</li>
                  <li><code className="bg-default-100 px-2 py-1 rounded">2</code> = 女性</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">檢查碼計算方式</h3>
                <div className="bg-default-100 p-4 rounded-lg mb-4">
                  <p className="mb-2"><strong>步驟 1：縣市代碼轉換</strong></p>
                  <p className="text-sm mb-3">將第 1 碼字母轉換為對應數值，拆分為十位數 d1 和個位數 d2<br/>例如：A = 10 → d1 = 1, d2 = 0</p>

                  <p className="mb-2"><strong>步驟 2：加權計算</strong></p>
                  <p className="text-sm mb-3">權重陣列：[1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]<br/>總和 = d1×1 + d2×9 + 第2碼×8 + 第3碼×7 + ... + 第9碼×1</p>

                  <p className="mb-2"><strong>步驟 3：計算檢查碼</strong></p>
                  <p className="text-sm">檢查碼 = (10 - (總和 % 10)) % 10</p>
                </div>
              </section>

              <section id="resident-cert" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">居留證號碼</h2>

                <h3 className="text-xl font-semibold mb-3">新版居留證（2021 年後）</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>長度</strong>：10 碼</li>
                  <li><strong>格式</strong>：X8XXXXXXXX 或 X9XXXXXXXX
                    <ul className="list-circle list-inside ml-6 mt-2">
                      <li>第 1 碼：英文字母（縣市代碼）</li>
                      <li>第 2 碼：數字 8 或 9（性別碼）</li>
                      <li>第 3-9 碼：7 位隨機數字</li>
                      <li>第 10 碼：檢查碼</li>
                    </ul>
                  </li>
                  <li><strong>性別碼</strong>：8 = 男性，9 = 女性</li>
                  <li><strong>檢查碼計算</strong>：與身分證字號完全相同</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">舊版居留證（2021 年前）</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>長度</strong>：10 碼</li>
                  <li><strong>格式</strong>：XYXXXXXXXX
                    <ul className="list-circle list-inside ml-6 mt-2">
                      <li>第 1 碼：英文字母（縣市代碼）</li>
                      <li>第 2 碼：英文字母 A/B/C/D（性別碼）</li>
                      <li>第 3-9 碼：7 位隨機數字</li>
                      <li>第 10 碼：檢查碼</li>
                    </ul>
                  </li>
                  <li><strong>性別碼</strong>：A 或 C = 男性，B 或 D = 女性</li>
                </ul>
              </section>

              <section id="phone" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">手機號碼</h2>

                <h3 className="text-xl font-semibold mb-3">格式規範</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>長度</strong>：10 碼</li>
                  <li><strong>格式</strong>：09XXXXXXXX</li>
                  <li><strong>第 1-2 碼</strong>：固定為 09</li>
                  <li><strong>第 3-4 碼</strong>：電信業者代碼</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">電信業者前綴碼</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-default-100 p-3 rounded">
                    <p className="font-semibold mb-2">中華電信</p>
                    <p className="text-sm">0910, 0911, 0912, 0913, 0916, 0917, 0918, 0919</p>
                  </div>
                  <div className="bg-default-100 p-3 rounded">
                    <p className="font-semibold mb-2">台灣大哥大</p>
                    <p className="text-sm">0920, 0921, 0922, 0923, 0928, 0929</p>
                  </div>
                  <div className="bg-default-100 p-3 rounded">
                    <p className="font-semibold mb-2">遠傳電信</p>
                    <p className="text-sm">0930, 0931, 0932, 0933, 0934, 0937, 0938, 0939</p>
                  </div>
                  <div className="bg-default-100 p-3 rounded">
                    <p className="font-semibold mb-2">台灣之星</p>
                    <p className="text-sm">0905, 0906, 0907, 0908, 0909</p>
                  </div>
                  <div className="bg-default-100 p-3 rounded">
                    <p className="font-semibold mb-2">亞太電信</p>
                    <p className="text-sm">0903, 0904</p>
                  </div>
                </div>
              </section>

              <section id="address" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">地址</h2>

                <h3 className="text-xl font-semibold mb-3">格式規範</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>格式</strong>：縣市 + 區域 + 路名 + [巷] + [弄] + 號 + [樓]</li>
                  <li><strong>範例</strong>：台北市大安區仁愛路100號5樓</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">地址組成規則</h3>
                <div className="bg-default-100 p-4 rounded-lg mb-4">
                  <p className="mb-3"><strong>必要元素：</strong></p>
                  <ul className="list-disc list-inside mb-4 ml-4">
                    <li>縣市：真實的台灣縣市名稱</li>
                    <li>區域：對應縣市的真實區域名稱</li>
                    <li>路名：常見的台灣路名</li>
                    <li>號碼：1-200</li>
                  </ul>

                  <p className="mb-3"><strong>可選元素：</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>巷：1-50（60% 機率出現）</li>
                    <li>弄：1-20（在有巷的情況下 40% 機率出現）</li>
                    <li>樓層：1-12 樓（30% 機率出現）</li>
                  </ul>
                </div>
              </section>

              <section id="zip-code" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">郵遞區號</h2>

                <h3 className="text-xl font-semibold mb-3">格式規範</h3>
                <ul className="list-disc list-inside mb-4">
                  <li><strong>長度</strong>：3 碼</li>
                  <li><strong>格式</strong>：純數字</li>
                  <li><strong>範圍</strong>：100-999</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">主要郵遞區號範圍</h3>
                <div className="bg-default-100 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    <li>台北市：100-116</li>
                    <li>新北市：220-253</li>
                    <li>桃園市：320-338</li>
                    <li>台中市：400-439</li>
                    <li>台南市：700-745</li>
                    <li>高雄市：800-852</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">資料一致性規則</h2>

                <div className="bg-warning-50 dark:bg-warning-100/10 border border-warning p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">跨欄位驗證</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>性別一致性</strong>：證件號碼的性別碼必須與台灣姓名、英文姓名的性別一致</li>
                    <li><strong>地址一致性</strong>：郵遞區號必須對應正確的縣市區域</li>
                    <li><strong>證件邏輯一致性</strong>：同一筆資料中，只會有一種證件號碼（身分證或居留證），且檢查碼必須正確</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">參考資料</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><a href="https://zh.wikipedia.org/wiki/中華民國國民身分證" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">中華民國國民身分證 - 維基百科</a></li>
                  <li><a href="https://zh.wikipedia.org/wiki/中華民國居留證" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">中華民國居留證 - 維基百科</a></li>
                  <li>內政部戶政司相關規範</li>
                </ul>
              </section>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
