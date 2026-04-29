# Web Portfolio — SeongHeon Sim

백엔드 개발자 심성헌의 기술 포트폴리오 웹사이트입니다.  
교보문고 주문결제 도메인에서 3년간 작업한 핵심 성과들을 기술 경력서 형태로 정리하여 웹으로 제공합니다.

## 🔗 Live

> 배포 후 URL 추가 예정

## 📌 주요 콘텐츠

| # | Case Study | 핵심 키워드 |
|---|------------|------------|
| 1 | 주문 완료 처리 리팩토링 | Command/Provider 패턴 · 보상 트랜잭션 · OpenFeign |
| 2 | 기프트카드 발급 인프라 구축 | AFTER_COMMIT · Kafka 비동기 · 이중 쓰기 방지 |
| 3 | 주문 완료 동시성 제어 | 비관적 락 · 상태 머신 · SELECT FOR UPDATE |
| 4 | 회원 인증 일원화 및 캐시 적용 | AOP · Strangler Fig · 운영 데이터 기반 의사결정 |

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + @tailwindcss/typography
- **Icons**: lucide-react
- **Deploy**: Vercel

## 📁 프로젝트 구조

```
web-portfolio/
├── docs/
│   ├── ai-plans/            # 기획서, 와이어프레임, WBS, 컨벤션
│   └── source-materials/    # 케이스 스터디 원본 마크다운
├── src/                     # (개발 시 생성) Next.js 소스 코드
├── .gemini/                 # AI 스타일 가이드
└── .gitignore
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📄 License

This project is for personal portfolio purposes.
