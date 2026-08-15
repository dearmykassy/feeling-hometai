import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import { BLOG_POSTS, createBlogMetadata } from "@/data/blog-posts";
import robots from "@/app/robots";
import sitemap, { FIXED_SITEMAP_PATHS } from "@/app/sitemap";
import { createRouteMetadataContract, SITE_ORIGIN, toNextMetadata } from "@/lib/metadata";
import { ACTIVE_REGION_NODES } from "@/lib/regions";

describe("static release guards and responsive shell", () => {
  it("publishes production discovery metadata on the approved domain", () => {
    expect(SITE_ORIGIN).toBe("https://feelinghometai.kr");
    expect(rootMetadata.metadataBase?.toString()).toBe("https://feelinghometai.kr/");
    expect(rootMetadata.robots).toMatchObject({ index: true, follow: true });
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
    expect(robots().sitemap).toBe("https://feelinghometai.kr/sitemap.xml");
    const expectedCount = ACTIVE_REGION_NODES.length + FIXED_SITEMAP_PATHS.length + BLOG_POSTS.length;
    expect(sitemap()).toHaveLength(expectedCount);
    expect(new Set(sitemap().map((entry) => entry.url)).size).toBe(expectedCount);
    expect(sitemap().every((entry) => entry.url.startsWith("https://feelinghometai.kr/"))).toBe(true);

    const routeMetadata = toNextMetadata(
      createRouteMetadataContract(
        "/areas/seoul/",
        "서울 홈타이 | 필링홈타이",
        "서울 지역 안내를 확인합니다.",
      ),
    );
    expect(routeMetadata.robots).toMatchObject({ index: true, follow: true });
    for (const post of BLOG_POSTS) {
      expect(createBlogMetadata(post).robots).toMatchObject({
        index: true,
        follow: true,
      });
    }
  });

  it("pins the Template3 fixed translucent navigation and compact mobile region cards", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    expect(css).toMatch(/\.site-header\s*\{[^}]*position:\s*fixed/);
    expect(css).toMatch(
      /backdrop-filter:\s*var\(--regional-header-backdrop-filter,\s*blur\(/,
    );
    expect(css).toMatch(/@media \(max-width: 840px\)[\s\S]*\.region-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2/);
    expect(css).toContain("min-width: 320px");
    expect(css).toContain("overflow: clip");
  });
});
