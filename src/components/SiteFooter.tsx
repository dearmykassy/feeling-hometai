import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label="필링홈타이 홈">
            <img
              className="footer-brand-mark"
              src="/images/feeling-hometai-brand/v1/feeling-hometai-mark-openai-v1.png"
              alt=""
              width="40"
              height="40"
              aria-hidden="true"
            />
            <h2>필링홈타이</h2>
          </Link>
          <p>지역 안내와 코스·가격, 현장 결제 기준을 차분하게 정리합니다.</p>
        </div>
        <div className="footer-links">
          <Link href="/areas/">지역 안내</Link>
          <Link href="/pricing/">가격 안내</Link>
          <Link href="/guide/">이용 안내</Link>
          <Link href="/notice/">공지사항</Link>
          <Link href="/blog/">블로그</Link>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </div>
        <p className="footer-meta">24시간 전화상담 · 선입금 없는 100% 현장 후불 · 현장 카드 결제 가능</p>
      </div>
    </footer>
  );
}
