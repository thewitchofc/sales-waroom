export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="main-content" className="min-h-screen">
      {children}
    </div>
  );
}
