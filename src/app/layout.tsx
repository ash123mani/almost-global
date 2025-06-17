import type { Metadata } from "next";

import Layout from "@/_components/layout";

export const metadata: Metadata = {
  title: "Almost cosmic",
  description: "Country details by almost cosmic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
        {children}
    </Layout>
  );
}
