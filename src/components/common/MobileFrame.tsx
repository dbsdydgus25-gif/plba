export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 430,
      minHeight: "100svh",
      background: "#fff",
      position: "relative",
      overflow: "hidden",
      margin: "0 auto",
    }}>
      {children}
    </div>
  );
}
