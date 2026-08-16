import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostPath } from "@/data/blog-posts";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/business";
import { createRouteMetadataContract, toNextMetadata } from "@/lib/metadata";

export const metadataContract = createRouteMetadataContract(
  "/blog/",
  "필링홈타이 이용 정보 | 외출 시간·자택·숙소 안내",
  "외출할 시간이 없을 때와 자택·숙소에서 필링홈타이를 이용할 때 확인할 시간, 주소, 코스와 결제 정보를 제공합니다.",
  ["필링홈타이 이용 정보", "출장마사지 문의 순서", "자택 출장마사지", "숙소 출장마사지"],
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
            <h1>출장마사지 문의에<br />필요한 정보</h1>
            <p className={"rang-fixed-heroLead"}>
              이용할 수 있는 시간, 서비스 주소, 코스와 결제 방식을 주제별로 정리했습니다.
            </p>
          </div>
          <div className={"rang-fixed-statRow"} aria-label="블로그 안내 요약">
            <div><span>게시물</span><strong>2편</strong></div>
            <div><span>주제</span><strong>시간 · 장소</strong></div>
            <div><span>문의 시간</span><strong>24시간</strong></div>
          </div>
        </header>

        <section className={"rang-fixed-section"} aria-labelledby="blog-list-title">
          <div className={"rang-fixed-sectionHeader"}>
            <div>
              <p className={"rang-fixed-sectionKicker"}>FEELING BLOG</p>
              <h2 id="blog-list-title">게시물</h2>
              <p>상황에 맞는 글을 선택해 전화 문의 항목을 확인하세요.</p>
            </div>
            <Link className={"rang-fixed-textLink"} href="/guide/">이용 방법 →</Link>
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
          <h2>주소와 희망 일정을 전화로 전달하세요.</h2>
          <p>이용 인원, 코스와 시간도 함께 알려주시면 실제 가능 여부를 확인할 수 있습니다.</p>
          <div className={"rang-fixed-buttonRow"}>
            <a className={"rang-fixed-button"} href={PHONE_HREF}>{PHONE_DISPLAY} 문의</a>
            <Link className={"rang-fixed-buttonAlt"} href="/pricing/">코스 가격</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
