# Intera Tools — Free Online Tools for Everyone

회원가입 없이 쓰는 무료 웹 도구 플랫폼입니다. 이미지·PDF 처리는 **모두 브라우저 안에서** 이루어지며 파일은 서버로 전송되지 않습니다. Google AdSense 광고 수익을 전제로 설계했습니다.

## 제공 도구 (16개 페이지 × 영어/한국어)

| 분류 | 도구 | 경로 |
| --- | --- | --- |
| 이미지 | 이미지 압축 (약하게/균형/강하게, 고급 품질, WebP 변환) | `/compress-image` |
| 이미지 | 크기 조절 (픽셀·비율, 비율 유지, 확대 방지) | `/resize-image` |
| 이미지 | 자르기 (드래그·핸들, 비율 프리셋, 좌표 입력, 방향키) | `/crop-image` |
| 이미지 | 형식 변환 (JPG/PNG/WebP, 품질, 투명 배경색) + 프리셋 3종 | `/convert-image`, `/jpg-to-png`, `/png-to-jpg`, `/webp-to-jpg` |
| 이미지 | 회전·반전 (전체/개별) | `/rotate-image` |
| 이미지 | 워터마크 (텍스트/로고, 위치 9칸·반복, 실시간 미리보기) | `/watermark-image` |
| PDF | 합치기 (드래그·버튼 정렬, 이름순) | `/merge-pdf` |
| PDF | 분할 (범위·페이지 선택·N페이지마다) | `/split-pdf` |
| PDF | 회전 (전체/페이지별, 무손실) | `/rotate-pdf` |
| PDF | 페이지 정리 (순서 변경·삭제·회전·빈 페이지·여러 PDF) | `/organize-pdf` |
| PDF | JPG → PDF (페이지 크기·방향·여백, 한 파일/개별) | `/jpg-to-pdf` |
| PDF | PDF → JPG/PNG (72/150/300 DPI, 페이지 범위) | `/pdf-to-jpg` |
| 생활 | QR 코드 생성 (URL·텍스트·Wi-Fi·이메일·전화·문자, PNG/SVG) | `/qr-code-generator` |

공통 흐름: **파일 추가(선택·드래그·붙여넣기) → 옵션 → 진행률/취소 → 결과(전후 용량, 개별·ZIP 다운로드) → 다른 도구로 이어서 작업(재업로드 없음)**.
거부·실패한 파일은 조용히 빠지지 않고 이유와 함께 표시됩니다(형식, 용량, 손상, 암호화 PDF, 메모리 부족 등).

## 기술 스택

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4
- 이미지: Canvas API, `upng-js`(PNG 팔레트 압축, Web Worker)
- PDF: `pdf-lib`(편집·생성), `pdfjs-dist` 5.4 legacy 빌드(썸네일·렌더링)
- 기타: `fflate`(ZIP), `qrcode`, `lucide-react`(아이콘)
- 무거운 엔진은 파일을 처리할 때만 동적으로 불러옵니다.

## 실행

```bash
npm install          # pdf.js 워커를 public/vendor로 복사(postinstall)
cp .env.example .env.local
npm run dev          # http://localhost:3000 → /en 또는 /ko 로 이동
npm run preview      # 정적 빌드(out/) + wrangler dev — 실제 Cloudflare와 같은 방식으로 확인 (http://localhost:8787)
npm run lint && npm run typecheck
npm run stats        # 개발 중 수집된 사용량·오류 요약 (data/events.ndjson)
```

> 개발 중 Turbopack이 일부 파일 변경을 감지하지 못해 화면이 갱신되지 않으면 `npm run dev`를 다시 시작하세요.
> 빌드 때 Google Fonts에서 글꼴을 받아오므로, 드물게 글꼴 오류로 빌드가 실패하면 다시 실행하세요.

## 배포 (Cloudflare Workers)

`next build`는 모든 페이지를 정적 파일(`out/`)로 내보냅니다. Cloudflare는 이 파일들을 Worker를 거치지 않고 바로 제공하므로(무료·무제한), 무료 한도(하루 10만 건)는 `worker/index.ts`가 처리하는 요청에만 쓰입니다.

| 요청 | 처리 |
| --- | --- |
| `/en/...`, `/ko/...`, 이미지·JS·sitemap 등 | 정적 파일 (`public/_headers`의 보안·캐시 헤더 적용) |
| `/`, 언어 없는 경로 | Worker → `tn_locale` 쿠키 또는 Accept-Language로 `/{locale}/…` 307 이동 |
| 없는 주소 | Worker → `404.html`을 404 상태로 |
| `POST /api/contact` | Worker → `CONTACT_WEBHOOK_URL`(Slack/Discord)로 전달. 미설정 시 오류 → 폼이 메일 주소 안내 |
| `POST /api/events` | Worker → Workers Logs에 한 줄씩 기록 (대시보드 → Workers → intera-tools → Logs, `type:"usage"`) |

GitHub 연결(Workers Builds): 빌드 명령 `npm run build`, 배포 명령 `npx wrangler deploy`, 루트 디렉터리 `/`.
- `NEXT_PUBLIC_*` → **빌드 변수**(Settings → Build → Variables and secrets). 바꾸면 다시 빌드해야 반영됩니다.
- `CONTACT_WEBHOOK_URL` → **Worker 비밀값**(Settings → Variables and Secrets, 유형 Secret).
- 직접 배포: `npx wrangler login` 후 `npm run deploy`.

## 구조

```
src/
  app/[locale]/            홈, 전체 도구, [tool] 도구 페이지, about/contact/privacy/terms
  app/global-not-found.tsx 매칭되지 않는 URL의 404 (out/404.html)
  server/                  언어 리다이렉트, 문의(허니팟·속도 제한·웹훅), 사용 이벤트(화이트리스트 필드만, IP 미저장) — Worker와 개발 서버가 공유
  proxy.dev.ts, app/api/*/route.dev.ts   `next dev` 전용 래퍼 (정적 빌드에서는 제외)
worker/index.ts            Cloudflare Worker: /api/*, 언어 리다이렉트, 404
wrangler.jsonc             Worker·정적 파일 설정
public/_headers            보안·캐시 헤더
  components/workspace/    업로드·옵션·진행·결과 공통 UI (ImageBatchTool, ToolShell, pdf 썸네일/정렬)
  components/tools/        도구별 작업 화면
  lib/image, lib/pdf       처리 엔진 래퍼
  lib/tools.ts             도구 레지스트리(카테고리, 아이콘, 관련 도구, 검색 별칭)
  content/                 도구별 SEO 본문(영/한), 정적 페이지 본문
  i18n/                    UI 문자열(영/한)
```

새 도구 추가: `lib/tools.ts`에 등록 → `content/tools/*`에 영/한 본문 → `components/tools/`에 작업 화면 → `ToolWorkspace.tsx`에 연결.

## SEO

- 언어별 서브패스(`/en`, `/ko`), canonical + hreflang(+x-default), 사이트맵(언어 대체 링크 포함), robots
- 도구 페이지: 고유 title/description, H1, 사용법 3단계, 특징, 설명 본문, FAQ, 관련 도구
- JSON-LD: `WebApplication`, `BreadcrumbList`, `FAQPage` (홈은 `WebSite` + `ItemList`)
- 공유 미리보기(OG) 이미지: 도구별 카드 32장 + 언어별 브랜드 카드, 빌드 시 생성(Pretendard 폰트)
- 제목은 검색 결과에서 잘리지 않도록 길면 " | Intera Tools"를 생략
- Search Console·네이버 서치어드바이저·Bing 소유 확인: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- 모든 페이지 정적 생성(SSG)

## 광고 (AdSense)

- `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_ADSENSE_SLOT_TOOL`, `NEXT_PUBLIC_ADSENSE_SLOT_HOME` 설정 시에만 스크립트와 광고가 로드됩니다. 미설정 시 개발 환경에서는 자리 표시, 운영 환경에서는 아무것도 표시하지 않습니다.
- 광고 위치: 도구 작업 영역 **아래**(업로드·옵션·다운로드 버튼 사이에는 두지 않음), 홈·전체 도구의 섹션 사이. 높이를 미리 확보해 레이아웃 이동(CLS)을 막습니다.
- 승인 후 `public/ads.txt`에 게시자 줄을 넣으세요. EEA·영국·스위스 방문자를 위해 Google 인증 CMP(동의 관리)를 AdSense에서 켜야 합니다.

## 사용량·오류 분석

`lib/analytics.ts` → `/api/events` (운영: Workers Logs, 개발: `data/events.ndjson`). 도구 조회, 파일 추가/거부(사유 코드), 처리 시작·성공·실패(오류 코드)·취소, 다운로드, 이어서 작업, 검색 적중 여부, 스크립트 오류를 기록합니다. 파일명·파일 내용·입력 텍스트는 보내지 않으며 쿠키도 쓰지 않습니다. Do Not Track/GPC가 켜진 브라우저는 전송하지 않습니다.

## 경쟁 서비스 대비 기능 차이 (브라우저 처리 방식의 한계)

| 항목 | 경쟁 서비스(TinyPNG·iLoveIMG·iLovePDF) | Intera Tools 현재 |
| --- | --- | --- |
| JPG/PNG 압축률 | 서버의 mozjpeg·pngquant | 브라우저 인코더 + PNG 팔레트 양자화. PNG는 비슷한 수준, JPG는 같은 화질에서 다소 덜 줄어들 수 있음 |
| WebP 저장 | 모든 브라우저 | Canvas WebP 인코딩을 지원하지 않는 브라우저(일부 Safari 버전)에서는 옵션 비활성화 + 안내 |
| HEIC 입력 | 지원 | Safari에서만 열림(Chrome 등은 "열 수 없음" 안내) |
| 애니메이션 GIF/WebP | 일부 도구 유지 | 첫 프레임만 사용 |
| AVIF 저장 | 일부 지원 | 미지원 (입력만 브라우저가 지원하면 가능) |
| 암호 PDF 열기/해제 | Unlock 도구 | 미지원 — 명확한 오류 표시 (qpdf WASM 도입 시 가능) |
| PDF 합치기 | 북마크 유지 | 페이지 내용은 무손실 복사, 북마크(개요)·일부 양식 기능은 유지되지 않을 수 있음 |
| PDF 압축, Office↔PDF, OCR, 편집, 서명 | 지원 | 이번 범위 밖 (Office·OCR은 서버/외부 API 필요) |
| 대용량 | 서버 한도 내 | 기기 메모리 한도. iOS Safari는 캔버스 약 16.7MP 제한 → 사전 안내 |
| 클라우드 가져오기(Drive 등), 계정 | 지원 | 범위 밖 |
| 무료 사용 제한 | 파일 수·용량·횟수 제한, 업그레이드 유도 | 없음 (기기 메모리 기준 100장/50MB, PDF 200MB 권장 한도만 안내) |

## 출시 전 확인 사항

- [ ] `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`을 실제 도메인·수신 가능한 메일로 설정 (기본값: `https://intera.tools`, `support@intera.tools`)
- [ ] 개인정보처리방침·이용약관 초안을 운영 주체 정보에 맞게 법률 검토 (운영 국가를 대한민국으로 가정해 작성됨)
- [ ] `CONTACT_WEBHOOK_URL`을 Worker 비밀값으로 설정
- [ ] AdSense 승인 → 클라이언트/슬롯 ID, `ads.txt`, CMP 설정
- [ ] Search Console 등록, 사이트맵 제출
- [ ] 실제 iPhone/Android 기기에서 대용량 파일 점검
