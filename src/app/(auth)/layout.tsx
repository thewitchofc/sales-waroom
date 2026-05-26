import { AnimatedPage } from "@/components/layout/animated-page";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black">{children}</div>
    </AnimatedPage>
  );
}
