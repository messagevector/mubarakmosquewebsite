import AutoRefresh from "@/components/AutoRefresh";

export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink text-text">
      <AutoRefresh minutes={60} />
      {children}
    </div>
  );
}
