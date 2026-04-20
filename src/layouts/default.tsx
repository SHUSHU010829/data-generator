import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-dvh">
      <Navbar />
      <main
        className="flex-grow mx-auto w-full max-w-screen-xl px-4 sm:px-6 pt-6 sm:pt-10 pb-8"
        id="main-content"
      >
        {children}
      </main>
      <footer
        className="w-full py-4 flex items-center justify-center"
        role="contentinfo"
      >
        <p className="text-xs text-[var(--text-tertiary)]">
          Made by{" "}
          <span className="text-[var(--text-secondary)] font-medium">shu.</span>
          {" "}・ 所有資料均為隨機模擬
        </p>
      </footer>
    </div>
  );
}
