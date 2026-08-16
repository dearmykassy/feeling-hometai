import type { Metadata } from "next";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/metadata";

export type BlogPost = {
  slug: "masaji-shop-gagi-himdeul-ttae" | "jibeseo-masaji-badeul-su-issnayo";
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  checklist: readonly string[];
  relatedSlug: BlogPost["slug"];
  image: {
    assetId: "feeling-note-01-v1" | "feeling-note-02-v1";
    src: string;
    alt: string;
  };
};

export const BLOG_POSTS = [
  {
    slug: "masaji-shop-gagi-himdeul-ttae",
    category: "시간·가격 확인",
    title: "외출할 시간이 없을 때 출장마사지 문의 순서",
    description:
      "매장에 갈 시간을 내기 어려울 때 이용 가능한 시간, 코스 가격, 서비스 주소와 현장 결제를 확인하는 순서입니다.",
    publishedAt: "2026-08-16T00:00:00+09:00",
    modifiedAt: "2026-08-16T00:00:00+09:00",
    intro:
      "매장에 다녀올 시간을 따로 내기 어렵다면 먼저 이용할 수 있는 시간을 계산하세요. 그다음 가격표에서 코스를 고르고 서비스 주소와 이용 인원을 전화로 전달하면 됩니다. 실제 가능 여부는 주소와 희망 시각을 확인한 뒤 안내합니다.",
    sections: [
      {
        heading: "이용할 수 있는 시간을 먼저 정하기",
        paragraphs: [
          "가격표의 코스는 이용 시간이 정해져 있습니다. 다른 일정과 겹치지 않는 시간을 확인한 뒤 원하는 시작 시각을 정하세요.",
          "희망 시각 하나만 전달하기 어려우면 가능한 시간대를 함께 말할 수 있습니다. 실제 일정은 전화상담에서 확인합니다.",
        ],
      },
      {
        heading: "가격표에서 코스와 금액 확인하기",
        paragraphs: [
          "타이, 아로마, 힐링, 스페셜 코스는 60분·90분·120분 금액이 표시되어 있고 남성전용 코스는 60분·90분으로 운영합니다.",
          "이용할 수 있는 시간과 예산에 맞는 코스를 정한 뒤 상담에서 코스명과 시간을 알려 주세요.",
        ],
      },
      {
        heading: "서비스 주소와 이용 인원 전달하기",
        paragraphs: [
          "서비스 지역은 시·군·구 이름만으로 확정하지 않습니다. 도로명 주소와 건물명을 기준으로 가능 여부를 확인합니다.",
          "전화할 때 희망 날짜·시각, 이용 인원, 선택한 코스와 시간을 함께 전달하면 됩니다. 상담은 365일 24시간 운영합니다.",
        ],
      },
      {
        heading: "결제는 서비스가 끝난 뒤 진행하기",
        paragraphs: [
          "필링홈타이는 사전 예약금을 받지 않습니다. 서비스 종료 후 현장에서 결제합니다.",
          "현금과 현장 카드 결제가 가능하며 카드 결제에는 무선 단말기를 사용합니다. 결제 방식에 관한 질문은 통화할 때 확인할 수 있습니다.",
        ],
      },
    ],
    checklist: ["이용 가능한 시간", "코스명과 이용 시간", "도로명 주소와 건물명", "이용 인원"],
    relatedSlug: "jibeseo-masaji-badeul-su-issnayo",
    image: {
      assetId: "feeling-note-01-v1",
      src: "/images/feeling-template3/blog/feeling-note-01-v1.webp",
      alt: "차분한 실내에서 상담 내용을 노트에 정리하는 여성",
    },
  },
  {
    slug: "jibeseo-masaji-badeul-su-issnayo",
    category: "자택·숙소 이용",
    title: "자택·숙소에서 이용할 때 전화로 확인할 내용",
    description:
      "자택이나 숙소에서 이용할 때 필요한 주소 정보, 희망 일정, 코스와 이용 후 현장 결제 기준을 정리했습니다.",
    publishedAt: "2026-08-16T00:00:00+09:00",
    modifiedAt: "2026-08-16T00:00:00+09:00",
    intro:
      "자택과 숙소 모두 서비스를 받을 정확한 주소가 필요합니다. 주소와 희망 날짜·시각, 이용 인원, 코스와 시간을 전화로 전달하면 실제 가능 여부를 확인할 수 있습니다. 장소에 따라 필요한 주소 정보를 구분해 정리했습니다.",
    sections: [
      {
        heading: "자택은 도로명 주소와 건물명 확인하기",
        paragraphs: [
          "자택에서 이용한다면 도로명 주소와 건물명을 확인하세요. 필요한 상세 주소는 전화상담에서 직접 전달하면 됩니다.",
          "지역명이나 인근 지명만으로는 서비스 주소를 확정할 수 없습니다. 실제 이용할 주소를 기준으로 가능 여부를 확인합니다.",
        ],
      },
      {
        heading: "숙소는 상호와 도로명 주소 대조하기",
        paragraphs: [
          "호텔이나 숙소는 상호와 도로명 주소가 일치하는지 확인하세요. 같은 이름의 숙소가 있을 수 있으므로 주소를 함께 전달합니다.",
          "공동현관이나 출입구에 관한 안내가 필요하다면 주소와 구분해 알려 주세요. 필요한 내용만 전화로 전달하면 됩니다.",
        ],
      },
      {
        heading: "희망 일정과 코스 함께 전달하기",
        paragraphs: [
          "희망 날짜·시각과 이용 인원을 정한 뒤 가격표에서 코스와 시간을 선택하세요. 커플·부부는 2인 동시 관리 프로그램을 문의할 수 있습니다.",
          "전화상담에서는 서비스 주소와 희망 일정, 이용 인원, 선택한 코스를 기준으로 내용을 확인합니다.",
        ],
      },
      {
        heading: "현장 결제와 위생 기준 확인하기",
        paragraphs: [
          "결제는 선입금 없이 서비스 종료 후 현장에서 진행합니다. 현금과 무선 단말기를 이용한 카드 결제가 가능합니다.",
          "일회용 비품을 사용하며 관리 전후 소독 원칙을 지킵니다. 위생이나 결제에 관한 질문은 전화상담에서 확인하세요.",
        ],
      },
    ],
    checklist: ["도로명 주소와 건물명", "숙소 상호와 도로명 주소", "희망 날짜·시각과 이용 인원", "코스와 이용 시간"],
    relatedSlug: "masaji-shop-gagi-himdeul-ttae",
    image: {
      assetId: "feeling-note-02-v1",
      src: "/images/feeling-template3/blog/feeling-note-02-v1.webp",
      alt: "밝은 창가에서 휴대전화와 메모를 확인하는 여성",
    },
  },
] as const satisfies readonly BlogPost[];

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((candidate) => candidate.slug === slug);
}

export function getBlogPost(slug: BlogPost["slug"]): BlogPost {
  const post = findBlogPost(slug);
  if (!post) throw new Error(`FEELING_BLOG_POST_NOT_FOUND:${slug}`);
  return post;
}

export function getBlogPostPath(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}/`;
}

export function createBlogMetadata(post: BlogPost): Metadata {
  const path = getBlogPostPath(post);
  const url = new URL(path, SITE_ORIGIN).href;
  return {
    title: { absolute: `${post.title} | ${SITE_NAME}` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
    },
    twitter: {
      card: "summary",
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}
