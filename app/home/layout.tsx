import { ReactNode, Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
