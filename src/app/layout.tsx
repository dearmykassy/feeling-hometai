import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PREVIEW_ORIGIN } from "@/lib/metadata";
import "@/components/RegionTemplate3.css";
import "./fixed-pages.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(PREVIEW_ORIGIN),
  title: {
    default: "필링홈타이 | 전국 출장 마사지 지역·가격 안내",
    template: "%s | 필링홈타이",
  },
  description:
    "전국 출장 마사지 지역 안내와 코스별 가격, 24시간 전화상담 및 현장 후불 기준을 확인하는 필링홈타이입니다.",
  keywords: [
    "필링홈타이",
    "전국 출장 마사지",
    "출장안마",
    "출장타이마사지",
    "출장스웨디시",
    "출장홈타이",
  ],
  robots: { index: false, follow: false, nocache: true },
  icons: {
    icon: [{ url: "/images/feeling-hometai-brand/v1/feeling-hometai-mark-openai-v1.png", type: "image/png" }],
    shortcut: "/images/feeling-hometai-brand/v1/feeling-hometai-mark-openai-v1.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#831d38",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell" id="top">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
