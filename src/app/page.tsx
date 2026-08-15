import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostPath } from "@/data/blog-posts";
import { OPERATING_NOTES, PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";
import { ACTIVE_ROOT_KEYS, getRootNode, ROOT_LABELS } from "@/lib/regions";
import { COURSE_GROUPS, NOTICE_ITEMS, SERVICE_FAQS, SERVICE_STEPS } from "@/lib/site-content";

export const metadataContract = createRouteMetadataContract(
  "/",
  "필링홈타이 | 전국 출장 마사지 지역·가격 안내",
  "전국 출장 마사지 운영 지역, 코스별 시간과 가격, 24시간 전화상담과 현장 후불 기준을 확인하는 필링홈타이입니다.",
  ["필링홈타이", "전국 출장 마사지", "출장안마", "출장타이마사지", "출장스웨디시", "출장홈타이"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

export default function Home() {
  const roots = ACTIVE_ROOT_KEYS.map((key) => {
    const node = getRootNode(key);
    return { key, name: ROOT_LABELS[key].short, path: node.path + "/", count: node.records.length };
  });

  return (
    <main className="t3-main" data-template3-home-hero="feeling-t3-home-mirror-v1" data-image-state="template3-mirror-selfie-v1">
      <div className="page-width main-inner">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <Image
            alt=""
            aria-hidden="true"
            className="home-hero-image"
            fill
            priority
            sizes="100vw"
            src="/images/feeling-template3/home/feeling-t3-home-mirror-v1.webp"
          />
          <div className="home-hero-scrim" aria-hidden="true" />
          <div className="home-hero-copy">
            <p className="eyebrow">FEELING HOMETAI · 24H CONSULTATION</p>
            <h1 id="home-hero-title">전국 출장 마사지,<br />지역부터 가격까지 한눈에</h1>
            <p className="hero-body">서비스 주소와 희망 시각을 준비하고, 원하는 코스와 현장 결제 기준을 차례로 확인하세요.</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/areas/">우리 지역 찾기</Link>
              <a className="button button--glass" href={PHONE_HREF}>전화상담</a>
            </div>
          </div>

          <div className="hero-stats" aria-label="주요 운영 기준">
            {OPERATING_NOTES.map((note, index) => (
              <article key={note}>
                <span>{["상담", "결제", "카드"][index]}</span>
                <strong>{note}</strong>
              </article>
            ))}
          </div>
        </section>

        <div className="information-sections">
          <section className="info-section" id="prices" aria-labelledby="price-title">
            <header className="section-heading section-heading--link">
              <div><span className="section-label">COURSE &amp; PRICE</span><h2 id="price-title">코스별 시간과 금액</h2><p>공개된 시간과 금액을 먼저 비교하고 상담에서 선택 내용을 확인하세요.</p></div>
              <Link href="/pricing/">전체 가격표 →</Link>
            </header>
            <div className="price-grid">
              {COURSE_GROUPS.map((group) => (
                <article key={group.course}>
                  <div><h3>{group.course}</h3><strong>{group.options[0]?.price}부터</strong></div>
                  <ul>{group.options.map((option) => <li key={option.minutes}><b>{option.minutes}분</b><span>{option.price}</span></li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="info-section" aria-labelledby="notice-title">
            <header className="section-heading section-heading--link">
              <div><span className="section-label">NOTICE</span><h2 id="notice-title">이용 전 공지사항</h2><p>전화상담과 현장 결제처럼 확인된 운영 기준만 정리했습니다.</p></div>
              <Link href="/notice/">전체 보기 →</Link>
            </header>
            <div className="info-grid info-grid--four notice-grid">
              {NOTICE_ITEMS.map((notice) => (
                <Link href={`/notice/#${notice.slug}`} key={notice.slug}>
                  <span className="tag">상시 안내</span>
                  <h3>{notice.title}</h3>
                  <p>{notice.summary}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="info-section" aria-labelledby="blog-title">
            <header className="section-heading section-heading--link">
              <div><span className="section-label">FEELING JOURNAL</span><h2 id="blog-title">이용 전 읽어보기</h2><p>주소·시간·코스를 준비할 때 필요한 내용을 두 편으로 나눴습니다.</p></div>
              <Link href="/blog/">블로그 보기 →</Link>
            </header>
            <div className="blog-preview-grid">
              {BLOG_POSTS.map((post, index) => (
                <article key={post.slug}>
                  <div
                    className="blog-preview-visual"
                    data-feeling-note-image={post.image.assetId}
                    style={{ "--feeling-note-image": `url(${post.image.src})` } as CSSProperties}
                  >
                    <span>FEELING NOTE {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div><span className="tag">{post.category}</span><h3><Link href={getBlogPostPath(post)}>{post.title}</Link></h3><p>{post.description}</p><Link className="text-link" href={getBlogPostPath(post)}>글 읽기 →</Link></div>
                </article>
              ))}
            </div>
          </section>

          <section className="info-section" id="process" aria-labelledby="process-title">
            <header className="section-heading"><span className="section-label">HOW TO USE</span><h2 id="process-title">이용 절차</h2></header>
            <ol className="process-list">
              {SERVICE_STEPS.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
            </ol>
          </section>

          <section className="info-section" id="faq" aria-labelledby="faq-title">
            <header className="section-heading"><span className="section-label">FAQ</span><h2 id="faq-title">자주 묻는 질문</h2></header>
            <div className="faq-list">
              {SERVICE_FAQS.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><b aria-hidden="true">＋</b></summary><p>{answer}</p></details>)}
            </div>
          </section>
        </div>

        <section className="contact-panel" aria-labelledby="contact-title">
          <div><span>24H CALL CENTER</span><h2 id="contact-title">주소와 희망 시간을 준비했다면<br />전화로 가능 여부를 확인하세요.</h2><p>{PHONE_DISPLAY} · 현장 후불 · 현장 카드 결제</p></div>
          <div className="contact-actions"><a href={PHONE_HREF}>전화상담</a><Link href="/guide/">이용 안내</Link><Link href="/pricing/">가격표</Link></div>
        </section>

        <section className="home-regions" aria-labelledby="regions-title">
          <header className="section-heading section-heading--link">
            <div><span className="section-label">SERVICE AREA</span><h2 id="regions-title">전국 출장 마사지 지역 안내</h2><p>각 권역을 선택하면 연결된 상세 지역 페이지를 확인할 수 있습니다.</p></div>
            <Link href="/areas/">전체 지역 →</Link>
          </header>
          <div className="region-grid">
            {roots.map((root, index) => (
              <Link className="region-card" href={root.path} key={root.path}>
                <span className="region-photo">
                  <Image alt="" aria-hidden="true" fill sizes="(max-width: 840px) 50vw, (max-width: 1099px) 33vw, 25vw" src={`/images/feeling-home-regions/v1/${root.key}.webp`} />
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </span>
                <span className="region-card-copy"><strong>{root.name} 출장 마사지</strong><small>{root.count}개 연결 지역</small><b>지역 안내 →</b></span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
