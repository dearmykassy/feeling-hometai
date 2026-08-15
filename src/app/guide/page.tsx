import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { SERVICE_FAQS, SERVICE_STEPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/guide/",
  "필링홈타이 이용 안내 | 주소·시간·코스 확인",
  "필링홈타이 이용 전 서비스 주소와 희망 시각, 코스·이용 시간, 현장 후불과 카드 결제를 확인하는 순서를 안내합니다.",
  ["필링홈타이 이용 안내", "출장마사지 이용 방법", "출장마사지 현장 후불", "24시간 전화상담"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

const OPERATING_STANDARDS = [
  ["24H CONSULTATION", "365일 24시간 전화상담", "새벽 시간을 포함해 필요한 내용과 실제 일정 안내를 전화로 확인할 수 있습니다."],
  ["PAYMENT", "선입금 없는 현장 후불", "사전 예약금 없이 이용이 끝난 뒤 현장에서 결제합니다."],
  ["CARD", "현장 카드 결제", "무선 단말기를 이용한 현장 카드 결제가 가능합니다."],
  ["PROGRAM & HYGIENE", "2인 동시 관리 · 위생 원칙", "커플·부부 2인 동시 관리 프로그램과 일회용 비품·소독 원칙을 운영합니다."],
] as const;

export default function GuidePage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · SERVICE GUIDE</p>
            <h1>주소부터 결제까지,<br />이용 순서를 한눈에.</h1>
            <p className={"rang-fixed-heroLead"}>
              통화 전에 필요한 정보만 차례로 준비하면 서비스 주소와 일정, 코스와 결제 기준을 더 쉽게 확인할 수 있습니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="이용 안내 요약">
            <div><span>상담 준비</span><strong>주소 · 시각</strong></div>
            <div><span>코스 선택</span><strong>시간 · 금액</strong></div>
            <div><span>결제 기준</span><strong>현장 후불</strong></div>
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="guide-process-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>STEP BY STEP</p>
              <h2 id="guide-process-title">이용 절차</h2>
              <p>서비스를 받을 지역과 희망 시각, 코스와 시간을 차례로 확인합니다.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/pricing/">가격 안내 보기 →</Link>
          </div>
          <ol className={"rang-fixed-steps"}>
            {SERVICE_STEPS.map(([number, title, copy]) => (
              <li key={number}>
                <span className={"rang-fixed-stepNumber"}>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={"rang-fixed-section"} aria-labelledby="guide-standard-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>SERVICE STANDARD</p>
              <h2 id="guide-standard-title">이용 전 알아둘 운영 기준</h2>
              <p>결제 방식, 운영시간, 프로그램과 위생 기준을 확인해 주세요.</p>
            </div>
          </div>
          <div className={"rang-fixed-standardGrid"}>
            {OPERATING_STANDARDS.map(([label, title, copy]) => (
              <article className={"rang-fixed-standardCard"} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={"rang-fixed-section"} aria-labelledby="guide-faq-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>FAQ</p>
              <h2 id="guide-faq-title">자주 묻는 질문</h2>
              <p>상담과 결제, 이용 인원과 위생에 관한 기본 기준을 모았습니다.</p>
            </div>
          </div>
          <div className={"rang-fixed-faqList"}>
            {SERVICE_FAQS.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><b aria-hidden="true">+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${"rang-fixed-section"} ${"rang-fixed-contactPanel"}`} aria-label="전화상담 바로가기">
          <p className={"rang-fixed-sectionKicker"}>24H CONSULTATION</p>
          <h2>준비한 내용을 전화로 확인해 보세요.</h2>
          <p>서비스 주소, 희망 시각, 코스와 이용 시간, 이용 인원을 알려주시면 필요한 내용을 확인할 수 있습니다.</p>
          <div className={"rang-fixed-buttonRow"}>
            <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 전화상담</a>
            <Link className={"rang-fixed-buttonAlt"} href="/areas/">지역 안내 보기</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
