import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, createBlogMetadata, findBlogPost, getBlogPostPath } from "@/data/blog-posts";
import { createBlogPostingJsonLd } from "@/lib/blog-schema";
import { PHONE_HREF } from "@/lib/business";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  return post ? createBlogMetadata(post) : {};
}

function formatPublishedDate(value: string): string {
  return value.slice(0, 10).replaceAll("-", ".");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const related = findBlogPost(post.relatedSlug);
  const schema = JSON.stringify(createBlogPostingJsonLd(post)).replace(/</gu, "\\u003c");

  return (
    <main className={"rang-fixed-page"}>
      <div className={"rang-fixed-frame"}>
        <header
          className={`${"rang-fixed-hero"} ${"rang-fixed-articleHero"}`}
          data-feeling-note-image={post.image.assetId}
          style={{ "--feeling-note-image": `url(${post.image.src})` } as CSSProperties}
        >
          <nav className={"rang-fixed-breadcrumb"} aria-label="현재 위치">
            <Link href="/">홈</Link>
            <i aria-hidden="true">›</i>
            <Link href="/blog/">블로그</Link>
          </nav>
          <div className={"rang-fixed-heroCopy"}>
            <p className={"rang-fixed-eyebrow"}>{post.category}</p>
            <h1>{post.title}</h1>
            <p className={"rang-fixed-heroLead"}>{post.description}</p>
            <p className={"rang-fixed-articleMeta"}>FEELING GUIDE · {formatPublishedDate(post.publishedAt)}</p>
          </div>
        </header>

        <article className={"rang-fixed-article"}>
          <p className={"rang-fixed-articleIntro"}>{post.intro}</p>
          {post.sections.map((section) => (
            <section className={"rang-fixed-articleSection"} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}

          <aside className={"rang-fixed-checklist"} aria-labelledby="blog-checklist-title">
            <h2 id="blog-checklist-title">전화 문의 항목</h2>
            <ul>{post.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>

          <nav className={"rang-fixed-articleLinks"} aria-label="관련 안내">
            {related && <Link href={getBlogPostPath(related)}>관련 글: {related.title}</Link>}
            <Link href="/pricing/">코스 가격 확인</Link>
            <Link href="/guide/">이용 방법 확인</Link>
            <Link href="/areas/">운영 지역 검색</Link>
            <a href={PHONE_HREF}>전화 문의</a>
          </nav>
        </article>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </main>
  );
}
