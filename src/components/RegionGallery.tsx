import Link from "@/components/SiteLink";
import type { RegionPageModel } from "@/lib/region-page-model";
import type { RegionChild } from "@/lib/regions";

type Item = Pick<RegionChild, "name" | "path" | "representativeCount">;

type RegionGalleryProps = {
  regionModel?: RegionPageModel["gallery"];
  items?: Item[];
  label?: string;
  title?: string;
  summary?: string;
};

/**
 * The sole card directory for both the root area index and regional pages.
 * Its callers pass only direct children, so the Template3 card treatment
 * cannot create orphaned programmatic routes.
 */
export function RegionGallery({
  regionModel,
  items,
  label = "SERVICE AREA",
  title,
  summary,
}: RegionGalleryProps) {
  const regions = regionModel?.items ?? items ?? [];
  const regional = Boolean(regionModel);
  const heading = regionModel?.heading ?? title ?? "전국 운영 지역";
  const supportingCopy =
    regionModel?.summary ??
    summary ??
    (regions.length > 0 ? `${regions.length}개 주요 권역` : "운영 지역을 준비 중입니다.");

  return (
    <section className="rang-t3-directory-section" aria-labelledby="region-directory-title">
      <div className="rang-t3-directory-heading">
        <div>
          <span
            className="rang-t3-section-label"
            {...(regionModel ? { "data-region-copy-id": regionModel.indexCopyId } : {})}
          >
            {regionModel?.index ?? label}
          </span>
          <h2
            id="region-directory-title"
            {...(regionModel ? { "data-region-copy-id": regionModel.headingCopyId } : {})}
          >
            {heading}
          </h2>
        </div>
        <p
          className="rang-t3-directory-summary"
          {...(regionModel ? { "data-region-copy-id": regionModel.summaryCopyId } : {})}
        >
          {supportingCopy}
        </p>
      </div>

      {regionModel ? (
        <article className="rang-t3-directory-guide" id={regionModel.guide.section.id}>
          <span className="rang-t3-guide-kicker">지역 선택 안내</span>
          <h2 data-region-copy-id={regionModel.guide.headingCopyId}>
            {regionModel.guide.section.heading}
          </h2>
          {regionModel.guide.section.paragraphs.map((paragraph, index) => (
            <p
              data-region-copy-id={regionModel.guide.paragraphCopyIds[index]}
              key={regionModel.guide.paragraphCopyIds[index]}
            >
              {paragraph}
            </p>
          ))}
          <Link
            className="rang-t3-guide-action"
            href={regionModel.guide.actionPath}
          >
            <span data-region-copy-id={regionModel.guide.actionCopyId}>
              {regionModel.guide.actionLabel}
            </span>
            <span aria-hidden="true"> →</span>
          </Link>
        </article>
      ) : null}

      {regions.length > 0 ? (
        <div className="rang-t3-directory-grid">
          {regions.map((region, index) => (
            <Link className="rang-t3-directory-card" href={region.path} key={region.path}>
              <span
                className="rang-t3-directory-card-number"
                {...(regional ? { "data-region-copy-id": `gallery:item:${index}:number` } : {})}
              >
                {"number" in region ? region.number : String(index + 1).padStart(2, "0")}
              </span>
              <strong
                className="rang-t3-directory-card-name"
                {...(regional ? { "data-region-copy-id": `gallery:item:${index}:name` } : {})}
              >
                {region.name}
              </strong>
              <small
                className="rang-t3-directory-card-count"
                {...(regional ? { "data-region-copy-id": `gallery:item:${index}:count` } : {})}
              >
                {"countLabel" in region
                  ? region.countLabel
                  : `${region.representativeCount}개 연결 지역`}
              </small>
            </Link>
          ))}
        </div>
      ) : (
        <article className="rang-t3-terminal-coordinate">
          <span aria-hidden="true">◎</span>
          <p
            {...(regionModel ? { "data-region-copy-id": regionModel.terminalCopyId } : {})}
          >
            {regionModel?.terminal ?? "서비스를 받을 도로명과 건물명은 전화로 확인합니다."}
          </p>
        </article>
      )}
    </section>
  );
}
