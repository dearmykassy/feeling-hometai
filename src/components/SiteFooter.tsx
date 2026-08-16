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
          <p>운영 지역, 코스별 금액과 이용 후 결제 기준을 안내합니다.</p>
        </div>
        <div className="footer-links">
          <Link href="/areas/">지역 찾기</Link>
          <Link href="/pricing/">코스 가격</Link>
          <Link href="/guide/">이용 방법</Link>
          <Link href="/notice/">운영 공지</Link>
          <Link href="/blog/">이용 정보</Link>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </div>
        <p className="footer-meta">24시간 전화 문의 · 예약금 없음 · 이용 후 현금·카드 결제</p>
      </div>
    </footer>
  );
}
