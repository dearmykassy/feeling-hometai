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
    category: "상담 준비",
    title: "일정을 비우기 어려운 날, 상담 전에 정리할 네 가지",
    description:
      "바쁜 날 필링홈타이 이용을 알아볼 때 서비스 주소, 희망 시각, 코스와 현장 결제를 차례로 정리하는 방법입니다.",
    publishedAt: "2026-08-16T00:00:00+09:00",
    modifiedAt: "2026-08-16T00:00:00+09:00",
    intro:
      "하루 일정이 촘촘한 날에는 필요한 내용을 먼저 한 장에 정리해 두면 전화상담이 훨씬 간결해집니다. 필링홈타이는 서비스를 받을 주소와 희망 시각을 기준으로 이용 정보를 확인합니다. 주소, 시간, 코스, 결제 순서를 따라가면 통화 중 놓치는 항목을 줄일 수 있습니다.",
    sections: [
      {
        heading: "지역명보다 서비스 주소를 먼저 적기",
        paragraphs: [
          "시·군·구 이름만으로는 서비스를 받을 장소를 충분히 구분하기 어렵습니다. 도로명과 건물명을 먼저 적고, 필요한 상세 주소는 전화상담에서 직접 알려 주세요.",
          "같은 지역 안에서도 희망 시각과 주소에 따라 안내 내용이 달라질 수 있습니다. 통화 전에는 주소 표기와 건물명이 맞는지 한 번 확인하는 편이 좋습니다.",
        ],
      },
      {
        heading: "희망 시각에는 조정 가능한 범위를 함께 두기",
        paragraphs: [
          "가장 원하는 시작 시각과 조정 가능한 시간대를 나눠 적어 두세요. 이용 인원도 같은 메모에 함께 적으면 통화할 때 필요한 내용을 빠르게 전할 수 있습니다.",
          "필링홈타이는 365일 24시간 전화상담을 운영합니다. 다만 실제 일정은 서비스 주소와 희망 시각을 함께 확인한 뒤 안내하므로, 코스 이용 시간까지 고려해 문의해 주세요.",
        ],
      },
      {
        heading: "가격표에서 시간에 맞는 코스 후보 고르기",
        paragraphs: [
          "가격 안내에는 타이마사지, 아로마마사지, 힐링마사지, 스페셜마사지, 남성전용 코스의 시간별 금액이 정리되어 있습니다. 비워 둘 수 있는 시간을 기준으로 먼저 후보를 골라 보세요.",
          "한 가지로 바로 정하기 어렵다면 이용 시간과 예산에 맞는 두 가지 후보를 준비하면 됩니다. 선택 코스와 실제 일정은 전화상담에서 다시 확인할 수 있습니다.",
        ],
      },
      {
        heading: "결제 기준은 이용 전에 함께 확인하기",
        paragraphs: [
          "필링홈타이는 사전 예약금 없이 이용이 끝난 뒤 현장에서 결제합니다. 무선 단말기를 이용한 현장 카드 결제도 가능하므로 계획한 결제 방식을 상담 때 함께 알려 주세요.",
          "주소, 시간, 코스, 결제 네 가지를 준비하면 바쁜 날에도 필요한 정보를 순서대로 확인할 수 있습니다. 남은 질문은 24시간 전화상담에서 이어서 문의해 주세요.",
        ],
      },
    ],
    checklist: ["도로명과 건물명", "희망 시각과 조정 범위", "코스와 이용 시간", "현장 결제 방식"],
    relatedSlug: "jibeseo-masaji-badeul-su-issnayo",
    image: {
      assetId: "feeling-note-01-v1",
      src: "/images/feeling-template3/blog/feeling-note-01-v1.webp",
      alt: "차분한 실내에서 상담 내용을 노트에 정리하는 여성",
    },
  },
  {
    slug: "jibeseo-masaji-badeul-su-issnayo",
    category: "이용 준비 노트",
    title: "집·숙소 이용 전, 전화로 전할 정보를 한 장에 정리하는 법",
    description:
      "집이나 숙소에서 필링홈타이 이용을 알아볼 때 주소, 출입 안내, 코스와 시간, 현장 결제를 정리하는 안내입니다.",
    publishedAt: "2026-08-16T00:00:00+09:00",
    modifiedAt: "2026-08-16T00:00:00+09:00",
    intro:
      "집이나 숙소에서 이용을 알아볼 때는 장소의 종류보다 서비스 주소와 필요한 안내를 먼저 정리하는 편이 편합니다. 통화 전에 짧은 메모를 만들어 두면 주소, 이용 인원, 코스와 시간을 한 번에 전할 수 있습니다. 필링홈타이의 실제 일정 안내는 전화상담에서 확인합니다.",
    sections: [
      {
        heading: "주소와 장소 이름을 같은 줄에 정리하기",
        paragraphs: [
          "자택이라면 도로명과 건물명, 필요한 주소 정보를 준비하세요. 숙소라면 예약한 곳의 이름과 서비스를 받을 주소가 같은지 확인해 두면 통화가 간결해집니다.",
          "주변 지명만 전달하기보다 서비스를 받을 정확한 주소를 먼저 알려 주세요. 서비스 지역과 희망 시각에 대한 안내는 전화상담에서 확인할 수 있습니다.",
        ],
      },
      {
        heading: "필요한 출입 안내는 주소와 분리해 두기",
        paragraphs: [
          "공동현관이나 여러 출입구처럼 통화에서 알려야 할 내용이 있다면 주소 메모와 분리해 적어 두세요. 필요한 범위만 설명하면 됩니다.",
          "이용 인원과 연락받을 고객 번호도 별도 항목으로 정리해 두면 좋습니다. 커플·부부를 위한 2인 동시 관리 프로그램은 상담에서 함께 확인할 수 있습니다.",
        ],
      },
      {
        heading: "코스는 이용 시간과 함께 비교하기",
        paragraphs: [
          "가격 안내에는 타이, 아로마, 힐링, 스페셜마사지와 남성전용 코스가 시간별로 정리되어 있습니다. 60분, 90분, 120분 가운데 필요한 시간을 먼저 비교해 보세요.",
          "남성전용 코스는 60분과 90분으로 운영합니다. 선택한 코스와 시작 시각은 서비스 주소를 기준으로 전화상담에서 확인합니다.",
        ],
      },
      {
        heading: "후불과 카드 결제 기준 확인하기",
        paragraphs: [
          "비용은 선입금 없이 이용이 끝난 뒤 현장에서 결제합니다. 무선 단말기를 이용한 현장 카드 결제도 가능하므로 결제 계획을 상담 중 함께 알려 주세요.",
          "필링홈타이는 일회용 비품 사용과 관리 전후 소독 원칙을 준수합니다. 지역 안내와 가격표를 확인한 뒤, 정리한 메모를 바탕으로 24시간 전화상담에 문의해 주세요.",
        ],
      },
    ],
    checklist: ["도로명·건물명과 상세 주소", "필요한 출입 안내", "이용 인원과 고객 전화번호", "희망 코스와 이용 시간"],
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
