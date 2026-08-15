import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { COURSE_GROUPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/pricing/",
  "필링홈타이 가격 안내 | 코스별 시간과 금액",
  "필링홈타이의 타이·아로마·힐링·스페셜·남성전용 코스별 이용 시간과 가격, 현장 후불 및 카드 결제 기준을 안내합니다.",
  ["필링홈타이 가격", "출장마사지 가격", "출장마사지 코스", "현장 후불"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

const PRICE_STATS = [
  ["운영 코스", "5가지"],
  ["시간별 선택", "14개"],
  ["결제 기준", "현장 후불"],
] as const;

export default function PricingPage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · COURSE &amp; PRICE</p>
            <h1>시간과 예산에 맞춰<br />코스를 비교해 보세요.</h1>
            <p className={"rang-fixed-heroLead"}>
              타이, 아로마, 힐링, 스페셜, 남성전용 코스의 시간별 금액을 확인할 수 있습니다.
              실제 이용 일정은 서비스 주소와 희망 시각을 기준으로 전화상담에서 안내합니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="가격 안내 요약">
            {PRICE_STATS.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="course-price-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>PRICE TABLE</p>
              <h2 id="course-price-title">코스별 시간과 금액</h2>
              <p>원하는 관리 방식과 이용 시간을 비교한 뒤 상담 때 코스 후보를 알려 주세요.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 순서 보기 →</Link>
          </div>
          <div className={"rang-fixed-courseGrid"}>
            {COURSE_GROUPS.map((group, index) => (
              <article className={"rang-fixed-courseCard"} key={group.course}>
                <header>
                  <span className={"rang-fixed-courseIndex"}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.course}</h3>
                </header>
                <ul>
                  {group.options.map((option) => (
                    <li key={option.minutes}>
                      <b>{option.minutes}분</b>
                      <strong>{option.price}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={"rang-fixed-calloutGrid"} aria-label="결제와 상담 안내">
          <div className={"rang-fixed-callout"}>
            <p className={"rang-fixed-sectionKicker"}>PAYMENT</p>
            <h2>선입금 없이, 이용 뒤 현장에서 결제합니다.</h2>
            <p>
              사전 예약금 없이 이용이 끝난 뒤 현장에서 결제하며, 무선 단말기를 이용한 현장 카드 결제도 가능합니다.
            </p>
            <div className={"rang-fixed-buttonRow"}>
              <a className={"rang-fixed-button"} href={PHONE_HREF}>전화상담</a>
              <Link className={"rang-fixed-buttonAlt"} href="/areas/">지역 안내 보기</Link>
            </div>
          </div>
          <aside className={"rang-fixed-infoCard"}>
            <span>BEFORE YOU CALL</span>
            <strong>주소 · 시각 · 코스</strong>
            <p>
              서비스를 받을 주소와 희망 시각, 코스와 이용 시간, 이용 인원을 알려주시면 필요한 내용을 확인할 수 있습니다.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
