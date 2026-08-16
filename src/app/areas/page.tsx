import type { Metadata } from "next";
import { RegionGallery } from "@/components/RegionGallery";
import { ACTIVE_ROOT_KEYS, getRootNode, ROOT_LABELS } from "@/lib/regions";
import {
  createRouteMetadataContract,
  toNextMetadata,
} from "@/lib/metadata";

export const metadataContract = createRouteMetadataContract(
  "/areas/",
  "필링홈타이 운영 지역 | 시·군·구·동 검색",
  "필링홈타이 서비스 지역을 11개 권역에서 시·군·구와 동·읍·면 순서로 확인합니다.",
);
export const metadata: Metadata = toNextMetadata(metadataContract);

export default function AreasPage() {
  const roots = ACTIVE_ROOT_KEYS.map((key) => ({
    name: ROOT_LABELS[key].full,
    path: getRootNode(key).path,
    representativeCount: getRootNode(key).records.length,
  }));
  return (
    <main className="rang-t3-areas-page areas-page" data-image-state="planned-no-assets">
      <section className="rang-t3-areas-intro">
        <div className="rang-t3-areas-intro-inner">
          <p className="rang-t3-eyebrow">FEELING HOMETAI · SERVICE AREA</p>
          <h1>필링홈타이 운영 지역</h1>
          <p>먼저 권역을 고른 뒤 주소에 적힌 시·군·구와 동·읍·면을 선택하세요.</p>
        </div>
      </section>
      <RegionGallery
        items={roots}
        label="REGION DIRECTORY"
        summary="서울·인천·경기 등 11개 권역에서 지역을 찾을 수 있습니다."
        title="지역별 안내 페이지"
      />
    </main>
  );
}
