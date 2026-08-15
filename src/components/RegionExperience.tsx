import Link from "next/link";
import { RegionGallery } from "@/components/RegionGallery";
import { PHONE_HREF } from "@/lib/business";
import {
  getRegionalImageAssignment,
  regionalHeaderThemeCss,
} from "@/lib/regional-image-runtime";
import { createRegionPageModel } from "@/lib/region-page-model";
import type { RegionNode } from "@/lib/regions";
import { COURSE_GROUPS, SERVICE_FAQS } from "@/lib/site-content";

/**
 * The regional model remains the single owner of route-specific copy. This
 * Template3 presentation layer intentionally changes only visual structure;
 * all 1,291 route values and their copy IDs render verbatim.
 */
export function RegionExperience({ node }: { node: RegionNode }) {
  const model = createRegionPageModel(node);
  const { content } = model;
  const image = getRegionalImageAssignment(model.route);

  return (
    <main
      className="rang-t3-region-page region-page"
      data-image-state="released"
      data-regional-image-id={image.assetId}
      data-region-route={model.route}
    >
      <style>{regionalHeaderThemeCss(image)}</style>
      <section className="rang-t3-region-hero" aria-labelledby="region-hero-title">
        <picture className="rang-t3-region-hero-media">
          <source media="(max-width: 767px)" srcSet={image.sources.mobile} />
          <source media="(max-width: 1199px)" srcSet={image.sources.tablet} />
          <img
            alt=""
            decoding="async"
            fetchPriority="high"
            height="900"
            src={image.sources.desktop}
            width="1600"
          />
        </picture>
        <div className="rang-t3-region-hero-overlay" aria-hidden="true" />
        <div className="rang-t3-region-hero-content">
          <nav className="rang-t3-breadcrumb" aria-label="현재 위치">
            {model.breadcrumbs.map((crumb, index) => (
              <span key={crumb.path}>
                {index > 0 ? <i aria-hidden="true">/</i> : null}
                <Link href={crumb.path} data-region-copy-id={crumb.copyId}>
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
          <p className="rang-t3-eyebrow" data-region-copy-id={model.opening.eyebrowCopyId}>
            {content.eyebrow}
          </p>
          <h1 id="region-hero-title" data-region-copy-id={model.opening.h1CopyId}>
            {content.h1}
          </h1>
          <div className="rang-t3-region-hooks">
            {content.hooks.map((hook, index) => (
              <p data-region-copy-id={model.opening.hookCopyIds[index]} key={hook}>
                {hook}
              </p>
            ))}
          </div>
          <div className="rang-t3-hero-actions">
            <a href={PHONE_HREF} data-region-copy-id={model.opening.primaryActionCopyId}>
              {content.ctaLabels[0]}
            </a>
            <Link href="/pricing/">
              <span data-region-copy-id={model.opening.scoreActionCopyId}>
                {content.ctaLabels[1]}
              </span>
            </Link>
          </div>
          <div className="rang-t3-hero-stats" aria-label={`${node.displayName} 이용 기준`}>
            <div>
              <span data-region-copy-id={model.scene.indexCopyId}>{model.scene.index}</span>
              <strong data-region-copy-id={model.scene.nameCopyId}>{model.scene.name}</strong>
            </div>
            <div>
              <span>상담</span>
              <strong>24시간 전화상담</strong>
            </div>
            <div>
              <span data-region-copy-id={model.scene.captionCopyId}>{model.scene.caption}</span>
              <strong>현장 후불</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="rang-t3-information-section" aria-label={`${node.displayName} 상세 안내`}>
        <div className="rang-t3-section-heading">
          <div>
            <span className="rang-t3-section-label">LOCAL GUIDE</span>
            <h2>{node.displayName} 이용 전 확인할 내용</h2>
          </div>
        </div>
        <div className="rang-t3-detail-list">
          {model.movements.map((movement) => (
            <article className="rang-t3-detail-card" id={movement.section.id} key={movement.section.id}>
              <span className="rang-t3-detail-kicker">
                <b data-region-copy-id={movement.numberCopyId}>{movement.number}</b>
                {" · "}
                <b data-region-copy-id={movement.kickerCopyId}>{movement.kicker}</b>
              </span>
              <h2 data-region-copy-id={movement.headingCopyId}>{movement.section.heading}</h2>
              {movement.section.paragraphs.map((paragraph, index) => (
                <p data-region-copy-id={movement.paragraphCopyIds[index]} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="rang-t3-information-section" aria-labelledby="regional-price-title">
        <div className="rang-t3-section-heading">
          <div>
            <span className="rang-t3-section-label">COURSE &amp; PRICE</span>
            <h2 id="regional-price-title">코스별 시간과 금액</h2>
          </div>
          <Link className="rang-t3-heading-link" href="/pricing/">전체 보기</Link>
        </div>
        <div className="rang-t3-price-grid">
          {COURSE_GROUPS.map((group, index) => (
            <article className="rang-t3-price-card" key={group.course}>
              <div className="rang-t3-price-card-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.course}</h3>
              </div>
              <ul>
                {group.options.map((option) => (
                  <li key={option.minutes}>
                    <b>{option.minutes}분</b>
                    <strong>{option.price}</strong>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rang-t3-information-section" aria-labelledby="regional-faq-title">
        <div className="rang-t3-section-heading">
          <div>
            <span className="rang-t3-section-label">FAQ</span>
            <h2 id="regional-faq-title">자주 묻는 질문</h2>
          </div>
        </div>
        <div className="rang-t3-faq-list">
          {SERVICE_FAQS.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>
                <span>{question}</span>
                <b aria-hidden="true">+</b>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rang-t3-contact-section">
        <div className="rang-t3-contact-panel">
          <div>
            <span data-region-copy-id={model.finalBeat.labelCopyId}>{model.finalBeat.label}</span>
            <h2 data-region-copy-id={model.finalBeat.headingCopyId}>{model.finalBeat.heading}</h2>
            <p data-region-copy-id={model.finalBeat.numberCopyId}>{model.finalBeat.number}</p>
          </div>
          <div className="rang-t3-contact-actions">
            <a href={PHONE_HREF} data-region-copy-id={model.finalBeat.phoneCopyId}>
              {model.finalBeat.phone}
            </a>
          </div>
        </div>
      </section>

      <RegionGallery regionModel={model.gallery} />
    </main>
  );
}
