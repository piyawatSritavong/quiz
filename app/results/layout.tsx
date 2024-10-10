import { ReactNode, Suspense } from "react";

export default function ResultLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
