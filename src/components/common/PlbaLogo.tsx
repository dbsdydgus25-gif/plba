import Image from "next/image";

export default function PlbaLogo({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/plba-symbol.png"
      width={size}
      height={size}
      alt="plba"
      style={{ objectFit: "contain" }}
    />
  );
}

export function PlbaWordmark({ height = 22 }: { height?: number }) {
  return (
    <Image
      src="/plba-logo.png"
      width={Math.round(height * 2.8)}
      height={height}
      alt="plba"
      style={{ objectFit: "contain" }}
    />
  );
}
