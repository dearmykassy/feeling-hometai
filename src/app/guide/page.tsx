import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { SERVICE_FAQS, SERVICE_STEPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/guide/",
  "필링홈타이 이용 방법 | 전화 문의부터 현장 결제까지",
  "필링홈타이 전화 문의에 필요한 주소·일정·인원과 코스 선택, 이용 후 현금·카드 결제 방법을 안내합니다.",
  ["필링홈타이 이용 방법", "출장마사지 전화 문의", "출장마사지 이용 후 결제", "출장마사지 카드 결제"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

const OPERATING_STANDARDS = [
  ["CALL", "연중무휴 전화 문의", "전화상담은 밤과 새벽을 포함해 24시간 운영합니다."],
  ["PAYMENT", "서비스 종료 후 결제", "별도 예약금 없이 이용이 끝난 뒤 현장에서 결제합니다."],
  ["CARD", "무선 카드 단말기", "현금 외에 현장 카드 결제를 선택할 수 있습니다."],
  ["TWO PERSON & HYGIENE", "2인 프로그램 · 소독", "커플·부부 2인 동시 관리, 일회용 비품 사용과 관리 전후 소독 원칙을 운영합니다."],
] as const;

export default function GuidePage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · SERVICE GUIDE</p>
            <h1>전화 문의 전에<br />확인할 항목</h1>
            <p className={"rang-fixed-heroLead"}>
              서비스 주소와 희망 날짜·시각, 이용 인원, 코스와 시간을 정리한 뒤 실제 가능 여부를 전화로 확인합니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="이용 안내 요약">
            <div><span>장소</span><strong>주소 · 건물명</strong></div>
            <div><span>일정</span><strong>날짜 · 시각</strong></div>
            <div><span>선택</span><strong>코스 · 시간</strong></div>
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="guide-process-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>STEP BY STEP</p>
              <h2 id="guide-process-title">이용 방법</h2>
              <p>주소 확인부터 이용 후 결제까지 네 단계로 구분됩니다.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/pricing/">코스 가격 →</Link>
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
              <h2 id="guide-standard-title">운영 항목</h2>
              <p>전화상담 시간, 결제 방식, 2인 프로그램과 위생 원칙입니다.</p>
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
              <h2 id="guide-faq-title">문의 항목</h2>
              <p>예약금, 운영 지역, 카드 결제, 2인 신청과 위생 기준에 관한 답변입니다.</p>
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
          <h2>서비스 주소와 일정을 전화로 문의하세요.</h2>
          <p>도로명 주소와 건물명, 희망 날짜·시각, 이용 인원, 코스와 시간을 전달하면 됩니다.</p>
          <div className={"rang-fixed-buttonRow"}>
            <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 문의</a>
            <Link className={"rang-fixed-buttonAlt"} href="/areas/">지역 목록</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
