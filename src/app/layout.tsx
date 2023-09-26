import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// 本地导入
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import WagmiConfigRegistry from "@/lib/WagmiRegistry";

import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Management Console",
  description: "Welcome to Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfigRegistry>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </WagmiConfigRegistry>
      </body>
    </html>
  );
}
