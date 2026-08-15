import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostPath } from "@/data/blog-posts";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";

export const metadataContract = createRouteMetadataContract(
  "/blog/",
  "필링홈타이 블로그 | 출장마사지 이용 전 체크",
  "외출이 부담스러운 날과 집·숙소에서 출장마사지를 알아볼 때 서비스 주소, 희망 시각, 코스, 현장 결제를 정리하는 필링홈타이 블로그입니다.",
  ["필링홈타이 블로그", "출장마사지 이용 전 체크", "출장마사지 준비", "출장마사지 안내"],
);
export const metadata: Metadata = toNextMetadata(metadataContract);

function formatPublishedDate(value: string): string {
  return value.slice(0, 10).replaceAll("-", ".");
}

export default function BlogIndexPage() {
  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header className={"rang-fixed-hero"}>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>FEELING HOMETAI · USEFUL NOTES</p>
            <h1>이용 전에 읽는<br />필링홈타이 안내.</h1>
            <p className={"rang-fixed-heroLead"}>
              서비스 주소와 시간, 코스와 결제를 정리할 때 도움이 되는 기본 내용을 짧고 명확하게 담았습니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="블로그 안내 요약">
            <div><span>이용 노트</span><strong>2편</strong></div>
            <div><span>먼저 확인</span><strong>주소 · 시각</strong></div>
            <div><span>상담 안내</span><strong>24시간</strong></div>
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="blog-list-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>FEELING BLOG</p>
              <h2 id="blog-list-title">최신 글</h2>
              <p>통화 전에 필요한 내용을 정리하는 두 가지 방법을 읽어 보세요.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 안내 보기 →</Link>
          </div>
          <div className={"rang-fixed-blogGrid"}>
            {BLOG_POSTS.map((post, index) => (
              <article className={"rang-fixed-postCard"} key={post.slug}>
                <div
                  className={"rang-fixed-postTop"}
                  aria-hidden="true"
                  data-feeling-note-image={post.image.assetId}
                  style={{ "--feeling-note-image": `url(${post.image.src})` } as CSSProperties}
                >
                  <span>FEELING NOTE</span>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                </div>
                <div className={"rang-fixed-postBody"}>
                  <span className={"rang-fixed-postCategory"}>{post.category}</span>
                  <h2><Link href={getBlogPostPath(post)}>{post.title}</Link></h2>
                  <p>{post.description}</p>
                  <div className={"rang-fixed-postFooter"}>
                    <time dateTime={post.modifiedAt}>{formatPublishedDate(post.modifiedAt)}</time>
                    <Link href={getBlogPostPath(post)}>글 읽기 →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${"rang-fixed-section"} ${"rang-fixed-contactPanel"}`} aria-label="상담 바로가기">
          <p className={"rang-fixed-sectionKicker"}>24H CONSULTATION</p>
          <h2>읽은 내용을 바탕으로 상담을 이어가세요.</h2>
          <p>서비스 주소, 희망 시각, 코스와 이용 시간을 준비하면 실제 일정과 결제 기준을 차례로 확인할 수 있습니다.</p>
          <div className={"rang-fixed-buttonRow"}>
            <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 전화상담</a>
            <Link className={"rang-fixed-buttonAlt"} href="/pricing/">가격 안내 보기</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
