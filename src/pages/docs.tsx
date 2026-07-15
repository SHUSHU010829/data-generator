import { List } from "lucide-react";

import { GlassCard } from "@/components/ui";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="w-full max-w-screen-xl px-6">
          <GlassCard padding="lg">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">驗證邏輯文件</h1>
            <div className="prose max-w-none">
              <p className="text-[var(--text-secondary)] mb-6">
                本文件記錄所有生成資料的格式規範和驗證邏輯。
              </p>

              <section className="mb-8">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--text-primary)] mb-4">
                  <List size={22} strokeWidth={2} className="text-[var(--text-tertiary)]" aria-hidden="true" />
                  目錄
                </h2>
                <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
                  <li><a href="#id-card" className="text-[--color-accent] hover:underline">身分證字號</a></li>
                  <li><a href="#resident-cert" className="text-[--color-accent] hover:underline">居留證號碼</a></li>
                  <li><a href="#taiwan-name" className="text-[--color-accent] hover:underline">台灣姓名</a></li>
                  <li><a href="#english-name" className="text-[--color-accent] hover:underline">英文姓名</a></li>
                  <li><a href="#zip-code" className="text-[--color-accent] hover:underline">郵遞區號</a></li>
                  <li><a href="#address" className="text-[--color-accent] hover:underline">地址</a></li>
                  <li><a href="#phone" className="text-[--color-accent] hover:underline">手機號碼</a></li>
                </ul>
              </section>

              <section id="id-card" className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">身分證字號</h2>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">格式規範</h3>
                <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
                  <li><strong>長度</strong>：10 碼</li>
                  <li><strong>格式</strong>：X1XXXXXXXX</li>
                </ul>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">性別碼規則</h3>
                <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
                  <li><code className="bg-[var(--surface-elevated)] px-2 py-0.5 rounded text-sm">1</code> = 男性</li>
                  <li><code className="bg-[var(--surface-elevated)] px-2 py-0.5 rounded text-sm">2</code> = 女性</li>
                </ul>
              </section>

              <section id="resident-cert" className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">居留證號碼</h2>
                <p className="text-[var(--text-secondary)]">新版（2021 年後）格式：第 2 碼為 8（男）或 9（女）</p>
              </section>

              <section id="phone" className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">手機號碼</h2>
                <p className="text-[var(--text-secondary)]">格式：09XXXXXXXX，共 10 碼</p>
              </section>
            </div>
          </GlassCard>
        </div>
      </section>
    </DefaultLayout>
  );
}
