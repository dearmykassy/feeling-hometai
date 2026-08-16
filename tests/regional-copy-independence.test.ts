import { describe, expect, it } from "vitest";
import {
  createRegionContent,
  KEYWORD_FAMILIES,
} from "@/lib/content";
import { customerText } from "@/lib/content-quality";
import { ACTIVE_REGION_NODES, getKeywordRegionLabel } from "@/lib/regions";

const contents = ACTIVE_REGION_NODES.map(createRegionContent);
const copy = contents.map(customerText).join("\n");
const sectionIds = [
  "area-scope-check",
  "call-detail-order",
  "time-course-choice",
  "price-reference",
  "onsite-payment",
  "final-change-check",
];

describe("Feeling Hometai regional copy independence", () => {
  it("keeps all 1,291 region routes and the eight-keyword metadata contract", () => {
    expect(contents).toHaveLength(1291);
    expect(KEYWORD_FAMILIES).toHaveLength(8);

    for (const [index, content] of contents.entries()) {
      const keywordLabel = getKeywordRegionLabel(ACTIVE_REGION_NODES[index]);
      expect(content.title).toBe(
        `${keywordLabel}홈타이 ${keywordLabel}출장마사지 | 필링홈타이`,
      );
      expect(content.keywords).toEqual(
        KEYWORD_FAMILIES.map((family) => `${keywordLabel}${family}`),
      );
      expect(content.sections.map((section) => section.id)).toEqual(sectionIds);
      expect(content.sections.flatMap((section) => section.paragraphs)).toHaveLength(12);
    }
  });

  it("uses Feeling-specific regional structure without legacy or cross-brand copy", () => {
    expect(copy).not.toMatch(/랑테라피|마사지봄|마사지러브|콜미토닥이/u);
    expect(copy).not.toMatch(
      /frame-directory-first|pulse-coordinate-note|tempo-time-window|score-course-ledger|settlement-last-beat|coda-before-arrival/u,
    );
    expect(new Set(contents.flatMap((content) =>
      content.sections.flatMap((section) => section.paragraphs),
    )).size).toBe(1291 * 12);
  });

  it("rejects hype, filler, provider promises, and unsupported timing language", () => {
    expect(copy).not.toMatch(
      /한눈에|차분하게|부담 없이|맞춤|흐름|여유롭게|특별한|섬세한|나만의|해 보세요/u,
    );
    expect(copy).not.toMatch(
      /최고|최상|프리미엄|완벽|즉시|곧 도착|도착 예정|배정|출발|관리사|테라피스트/u,
    );
  });

  it("states only the confirmed operating and payment facts", () => {
    expect(copy).toContain("24시간 전화상담");
    expect(copy).toMatch(/선입금 없는 현장 후불|선입금 없이 이용 후|예약금이나 선입금은 받지 않습니다/u);
    expect(copy).toMatch(/현장 카드 결제|현장에서 카드로 결제|카드를 사용할 수 있습니다/u);
    expect(copy).not.toMatch(/카드 (?:사용|결제) 여부|카드 결제 가능 여부/u);
  });
});
