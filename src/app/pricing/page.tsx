import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { COURSE_GROUPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/pricing/",
  "필링홈타이 코스 가격 | 타이·아로마·힐링 시간별 요금",
  "필링홈타이 타이·아로마·힐링·스페셜·남성전용 코스의 시간별 금액과 이용 후 현장 결제, 카드 결제 기준입니다.",
  ["필링홈타이 코스 가격", "출장마사지 요금표", "출장마사지 이용 시간", "이용 후 결제"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

const PRICE_STATS = [
  ["코스 구분", "5개"],
  ["가격 항목", "14개"],
  ["결제 시점", "이용 후"],
] as const;

export default function PricingPage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · COURSE &amp; PRICE</p>
            <h1>코스별 이용 시간과<br />금액 안내</h1>
            <p className={"rang-fixed-heroLead"}>
              타이, 아로마, 힐링, 스페셜 코스는 60분·90분·120분으로 구성됩니다.
              남성전용 코스는 60분과 90분이며 실제 일정은 전화 문의로 확인합니다.
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
              <h2 id="course-price-title">전체 가격표</h2>
              <p>코스명과 이용 시간을 정할 때 아래 금액을 기준으로 확인하세요.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 방법 →</Link>
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
            <h2>예약금은 받지 않습니다.</h2>
            <p>
              결제는 서비스 종료 후 현장에서 진행합니다. 현금과 무선 단말기를 이용한 카드 결제가 가능합니다.
            </p>
            <div className={"rang-fixed-buttonRow"}>
              <a className={"rang-fixed-button"} href={PHONE_HREF}>전화 문의</a>
              <Link className={"rang-fixed-buttonAlt"} href="/areas/">운영 지역</Link>
            </div>
          </div>
          <aside className={"rang-fixed-infoCard"}>
            <span>BEFORE YOU CALL</span>
            <strong>주소 · 일정 · 인원</strong>
            <p>
              서비스 주소와 희망 날짜·시각, 이용 인원, 선택한 코스와 시간을 전화로 전달해 주세요.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
