import { ToastProvider } from "@/components/ui/Toast";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
