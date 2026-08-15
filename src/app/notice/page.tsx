import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { NOTICE_ITEMS, SERVICE_STEPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/notice/",
  "필링홈타이 공지사항 | 전화상담·결제 안내",
  "필링홈타이의 24시간 전화상담, 서비스 주소·시간·코스 확인, 선입금 없는 현장 후불과 카드 결제 기준을 안내합니다.",
  ["필링홈타이 공지사항", "출장마사지 전화상담", "현장 후불", "현장 카드 결제"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

export default function NoticePage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · NOTICE</p>
            <h1>이용 전에 확인할<br />운영 안내입니다.</h1>
            <p className={"rang-fixed-heroLead"}>
              전화상담, 서비스 주소와 시간 확인, 현장 후불과 카드 결제에 관한 기본 기준을 한곳에 정리했습니다.
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
              <h2 id="notice-list-title">공지사항</h2>
              <p>이용 전 통화에서 확인할 내용과 결제 기준을 먼저 살펴보세요.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 안내 보기 →</Link>
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
            <h2>통화 전에 네 가지만 정리해 주세요.</h2>
            <ol>
              {SERVICE_STEPS.map(([number, title]) => (
                <li key={number}><b>{number}</b><span>{title}</span></li>
              ))}
            </ol>
          </aside>
          <div className={"rang-fixed-contactPanel"}>
            <p className={"rang-fixed-sectionKicker"}>24H CONSULTATION</p>
            <h2>확인할 내용을 정리했다면 상담으로 이어가세요.</h2>
            <p>서비스 주소, 희망 시각, 코스와 이용 시간, 이용 인원을 알려주시면 필요한 내용을 확인할 수 있습니다.</p>
            <div className={"rang-fixed-buttonRow"}>
              <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 전화상담</a>
              <Link className={"rang-fixed-buttonAlt"} href="/pricing/">가격 안내 보기</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
