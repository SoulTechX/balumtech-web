import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metrika | BALUMTech",
};

export default function MetrikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
