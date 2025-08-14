# CU 편의점 웹 리뉴얼 프로젝트

본 프로젝트는 CU 편의점 웹사이트를 리뉴얼한 HTML 기반 페이지입니다.  
반응형 레이아웃, 햄버거 메뉴, 상품 슬라이드, PWA 기능을 포함하며  
사용자 경험(UX)과 편의성을 강화하는 것을 목표로 제작되었습니다.

---

## 📌 주요 기능

- **반응형 헤더 및 내비게이션**
  - 로고 및 메인 메뉴
  - 햄버거 메뉴(서브메뉴 토글 애니메이션 포함)
- **상품 섹션**
  - 1+1, 2+1, 전용 상품 등 카테고리 탭
  - 좌우 이동 화살표로 제품 슬라이드
- **Quick Pick & Best Pick**
  - 주간 인기 상품
  - 간편 카테고리별 빠른 접근
- **SNS 및 서비스 바로가기 아이콘**
  - Event, Instagram, Youtube, 창업안내, 매장찾기, 고객센터
- **푸터**
  - Quick Menu 드롭다운
  - 회사 정보 및 저작권 표시
- **PWA 지원**
  - `manifest.json` 연동
  - `service_worker.js` 등록을 통한 오프라인 지원

---

## 🛠 사용 기술

- **Frontend**: HTML5, CSS3, JavaScript (jQuery)
- **아이콘**: Font Awesome, 커스텀 이미지 아이콘
- **PWA**: Manifest, Service Worker
- **폰트/이미지**: 프로젝트 내 `/image` 폴더 사용

---

## 📂 폴더 구조
```
legacy/
├── index.html
├── css/
│ ├── reset.css
│ └── layout.css
├── js/
│ ├── jquery-3.1.1.min.js
│ └── script.js
├── image/
│ └── ... (로고, 아이콘, 상품 이미지 등)
├── manifest.json
└── service_worker.js
```
---
## 🚀 실행 방법

1. 프로젝트 폴더를 로컬 환경에 다운로드 또는 클론합니다.
2. 브라우저에서 `index.html` 파일을 엽니다.
3. PWA 기능을 테스트하려면 HTTPS 환경에서 실행하거나  
    로컬 서버(`Live Server` 확장 등)를 이용하세요.

---

## 📱 PWA 설치 안내

1. HTTPS 환경에서 사이트 접속
2. 브라우저의 "홈 화면에 추가" 기능 사용 (Safari 권장)
3. 앱처럼 홈 화면에서 실행 가능

---


## 📄 라이선스

이 프로젝트는 학습 및 포트폴리오 용도로 제작되었습니다.  
상업적 사용 시 원저작자의 동의를 받아야 합니다.
