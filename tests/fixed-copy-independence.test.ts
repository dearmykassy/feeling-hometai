import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { metadataContract as homeMetadata } from "@/app/page";
import { metadataContract as areasMetadata } from "@/app/areas/page";
import { metadataContract as blogMetadata } from "@/app/blog/page";
import { metadataContract as guideMetadata } from "@/app/guide/page";
import { metadataContract as noticeMetadata } from "@/app/notice/page";
import { metadataContract as pricingMetadata } from "@/app/pricing/page";
import { BLOG_POSTS } from "@/data/blog-posts";
import { NOTICE_ITEMS, SERVICE_FAQS, SERVICE_STEPS } from "@/lib/site-content";

const COPY_SOURCE_PATHS = [
  "src/app/page.tsx",
  "src/app/areas/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/guide/page.tsx",
  "src/app/notice/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/data/blog-posts.ts",
  "src/lib/site-content.ts",
  "src/components/SiteHeader.tsx",
  "src/components/SiteFooter.tsx",
  "src/components/BottomNav.tsx",
] as const;

const BANNED_GENERIC_PHRASES = [
  "한눈에",
  "차분하게",
  "부담 없이",
  "맞춤",
  "흐름",
  "여유롭게",
  "특별한",
  "섬세한",
  "나만의",
  "해 보세요",
  "짧고 명확하게",
  "이어가세요",
] as const;

const LEGACY_RANG_METADATA = [
  [
    "{brand} | 전국 출장 마사지 지역·가격 안내",
    "전국 출장 마사지 운영 지역, 코스별 시간과 가격, 24시간 전화상담과 현장 후불 기준을 확인하는 {brand}입니다.",
  ],
  [
    "{brand} 가격 안내 | 코스 시간·요금표",
    "{brand}의 타이·아로마·힐링·스페셜·남성전용 코스별 이용 시간과 가격, 현장 후불 및 카드 결제 기준을 안내합니다.",
  ],
  [
    "{brand} 이용 안내 | 주소·시간·코스 확인",
    "{brand} 이용 전 서비스 주소와 희망 시각, 코스·이용 시간, 현장 후불과 카드 결제를 확인하는 순서를 안내합니다.",
  ],
  [
    "{brand} 공지사항 | 전화상담·결제 안내",
    "{brand}의 24시간 전화상담, 서비스 주소·시간·코스 확인, 선입금 없는 현장 후불과 카드 결제 기준을 안내합니다.",
  ],
  [
    "{brand} 블로그 | 출장마사지 이용 전 체크",
    "외출이 부담스러운 날과 집·숙소에서 출장마사지를 알아볼 때 서비스 주소, 희망 시각, 코스, 현장 결제를 정리하는 {brand} 블로그입니다.",
  ],
] as const;

function normalizeBrand(value: string): string {
  return value.replaceAll("필링홈타이", "{brand}").replaceAll("랑테라피", "{brand}");
}

describe("feeling hometai fixed copy independence", () => {
  it("keeps fixed-page metadata independent from the Rang brand-swap patterns", () => {
    const legacyTitles = new Set<string>(LEGACY_RANG_METADATA.map(([title]) => title));
    const legacyDescriptions = new Set<string>(LEGACY_RANG_METADATA.map(([, description]) => description));
    const contracts = [homeMetadata, areasMetadata, pricingMetadata, guideMetadata, noticeMetadata, blogMetadata];

    for (const contract of contracts) {
      expect(legacyTitles.has(normalizeBrand(contract.title))).toBe(false);
      expect(legacyDescriptions.has(normalizeBrand(contract.description))).toBe(false);
    }
  });

  it("does not restore generic filler or the former shared step and notice wording", () => {
    const source = COPY_SOURCE_PATHS.map((path) => readFileSync(path, "utf8")).join("\n");
    for (const phrase of BANNED_GENERIC_PHRASES) expect(source).not.toContain(phrase);

    expect(SERVICE_STEPS.map(([, title]) => title)).toEqual([
      "주소 확인",
      "상담 문의",
      "코스 결정",
      "이용 후 결제",
    ]);
    expect(SERVICE_STEPS.map(([, title]) => title)).not.toEqual([
      "전화상담",
      "코스·시간 선택",
      "내용 확인",
      "현장 결제",
    ]);
    expect(NOTICE_ITEMS.map((notice) => notice.title)).toEqual([
      "전화상담 운영 시간",
      "상담 시 확인하는 항목",
      "결제 시점 안내",
      "카드 결제 안내",
    ]);
  });

  it("retains the confirmed facts and complete article records", () => {
    const fixedCopy = JSON.stringify({ SERVICE_STEPS, SERVICE_FAQS, NOTICE_ITEMS, BLOG_POSTS });
    for (const fact of ["24시간", "선입금", "현장", "카드", "2인", "일회용", "소독"]) {
      expect(fixedCopy).toContain(fact);
    }

    expect(BLOG_POSTS).toHaveLength(2);
    for (const post of BLOG_POSTS) {
      expect(post.sections).toHaveLength(4);
      expect(post.sections.flatMap((section) => section.paragraphs)).toHaveLength(8);
      expect(post.checklist).toHaveLength(4);
      expect(post.relatedSlug).not.toBe(post.slug);
    }
  });
});
