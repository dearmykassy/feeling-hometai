import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { NOTICE_ITEMS, SERVICE_STEPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/notice/",
  "필링홈타이 운영 공지 | 상담 시간·이용 후 결제",
  "필링홈타이 전화상담 운영 시간, 문의 시 확인하는 정보, 예약금 없는 이용 후 결제와 카드 결제 안내입니다.",
  ["필링홈타이 운영 공지", "출장마사지 상담 시간", "출장마사지 이용 후 결제", "무선 카드 단말기"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

export default function NoticePage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · NOTICE</p>
            <h1>상담과 결제에 관한<br />운영 공지</h1>
            <p className={"rang-fixed-heroLead"}>
              전화 문의 가능 시간과 상담 시 필요한 정보, 결제 시점과 카드 결제 방식을 안내합니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="공지 핵심 안내">
            <div><span>상담</span><strong>365일 24시간</strong></div>
            <div><span>결제</span><strong>현장 후불</strong></div>
            <div><span>카드</span><strong>현장 결제 가능</strong></div>
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="notice-list-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>FEELING NOTICE</p>
              <h2 id="notice-list-title">현재 운영 기준</h2>
              <p>아래 네 항목은 상담과 결제에 공통으로 적용됩니다.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 방법 →</Link>
          </div>
          <div className={"rang-fixed-noticeList"}>
            {NOTICE_ITEMS.map((notice, index) => (
              <article className={"rang-fixed-noticeCard"} id={notice.slug} key={notice.slug}>
                <span className={"rang-fixed-noticeNumber"}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{notice.title}</h3>
                  <p>{notice.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={"rang-fixed-calloutGrid"} aria-label="상담 준비와 전화상담">
          <aside className={"rang-fixed-noticeSide"}>
            <p className={"rang-fixed-sectionKicker"}>CONSULTATION NOTE</p>
            <h2>전화 문의 순서</h2>
            <ol>
              {SERVICE_STEPS.map(([number, title]) => (
                <li key={number}><b>{number}</b><span>{title}</span></li>
              ))}
            </ol>
          </aside>
          <div className={"rang-fixed-contactPanel"}>
            <p className={"rang-fixed-sectionKicker"}>24H CONSULTATION</p>
            <h2>운영 지역과 실제 일정을 문의하세요.</h2>
            <p>서비스 주소, 희망 날짜·시각, 이용 인원, 코스와 시간을 전화로 전달하면 됩니다.</p>
            <div className={"rang-fixed-buttonRow"}>
              <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 문의</a>
              <Link className={"rang-fixed-buttonAlt"} href="/pricing/">코스 가격</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
