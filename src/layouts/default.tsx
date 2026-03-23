import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 flex-grow pt-8 sm:pt-16 pb-8">
        {children}
      </main>
      <footer className="w-full flex justify-center py-4 sm:py-3 gap-1 text-xs">
        <span>Made by shu.</span>
      </footer>
    </div>
  );
}
