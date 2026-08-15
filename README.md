# 필링홈타이

`feeling-hometai`는 검증된 1,291개 운영 지역과 전화·가격·결제 사실을 Template3 화면에 담은 독립 정적 플랫폼입니다. 지역, 가격, 이용 안내, 공지사항과 블로그를 한 흐름으로 연결합니다.

## 현재 공개 상태

- 콘텐츠 코퍼스: `COMPLETE`, 지역 문서 1,291개.
- 이미지: 홈·FEELING NOTE·홈 지역 카드 사진은 각각 생성/출처 영수증에 결속되어 있습니다. Template3 거울 셀피 지역 배너는 root가 130장을 접촉시트로 전수 확인했고, release receipt와 assignment manifest의 exact SHA에 결속된 130개 asset·1,291개 route·390개 public WebP가 runtime에 활성화되어 있습니다.
- 브랜드: 헤더와 파비콘은 투명 배경 전용 마크 `/images/feeling-hometai-brand/v1/feeling-hometai-mark-openai-v1.png`를 함께 사용합니다.
- 지역 검색: 상단 검색창은 전체 지역 그래프를 검색해 일치하는 상세 지역 페이지로 바로 이동합니다.
- 검색 공개: 승인된 운영 도메인 `https://feelinghometai.kr`을 canonical·Open Graph·sitemap의 정본으로 사용하며 robots와 페이지 메타는 색인을 허용합니다.
- 정적 URL: 지역 1,291개 + 고정 6개 + 블로그 글 2개 = sitemap 1,299개.

## 검증

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## GA4 환경 변수

Netlify의 `Site configuration → Environment variables`에 사이트 전용 GA4 웹 스트림 값을 빌드 환경 변수로 등록합니다.

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

값이 없거나 잘못된 형식이면 계측 코드는 출력되지 않습니다. 이벤트와 개인정보 제외 규칙은 `docs/ANALYTICS.md`를 따릅니다.

`artifacts/content-corpus.json`은 고객 화면에 영향을 주는 앱·컴포넌트·지역·콘텐츠 소스 manifest SHA와 함께 결정적으로 재생성됩니다. `artifacts:generate`는 승인된 이미지 release receipt의 schema/status, assignment manifest SHA, route/asset/reuse/public WebP 수와 실제 파일 존재를 exact 검증합니다. 운영 origin이 승인된 `https://feelinghometai.kr`과 정확히 일치하고 이미지 결속도 유효할 때 `deploymentAllowed: true`, `deploymentBlockers: []`를 기록합니다. 브라우저 QA 결과와 320/390/1440 증거는 `qa/browser/report.json`에 고정했습니다.

운영 공개 계약은 다음 조건을 고정합니다. `/Users/ssm/Documents/Codex/platform-governance/bin/audit-platforms`의 플랫폼 간 콘텐츠 감사는 이 SEO 출력 계약과 분리해 관리합니다.

- 운영 도메인 `https://feelinghometai.kr`의 HTTPS·apex canonical 유지
- canonical·Open Graph·robots·sitemap의 운영 origin 일치
- 승인된 이미지 release receipt와 1,291개 route assignment의 exact 결속 유지
