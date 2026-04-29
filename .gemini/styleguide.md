# Web Portfolio — Gemini Style Guide

이 프로젝트에서 코드를 생성하거나 수정할 때 반드시 아래 규칙을 따르세요.
상세 컨벤션 원본: `docs/ai-plans/conventions.md`

## 기술 스택
- Next.js (App Router) + TypeScript
- TailwindCSS + @tailwindcss/typography
- lucide-react (아이콘)

## 파일 네이밍
- 컴포넌트: PascalCase (`Header.tsx`, `ProjectCard.tsx`)
- 페이지: Next.js 기본 (`page.tsx`, `layout.tsx`)
- 데이터/유틸: camelCase (`experience.ts`, `projects.ts`)
- 폴더: kebab-case (`components/`, `data/`)

## 컴포넌트 작성
- 화살표 함수 + export default 통일
- 기본은 Server Component. `useState`, `useEffect`, `onClick` 등이 필요할 때만 `"use client"` 선언
- Props는 인라인 타입 기본. Props가 많으면 interface 분리

## 스타일링
- TailwindCSS 인라인 클래스 사용
- 커스텀 CSS 최소화 (globals.css에만 필요 시 추가)
- 장문 콘텐츠는 `prose` 클래스 활용

## 사용 금지 항목
- 상태 관리 라이브러리 (Redux, Zustand 등)
- 다크 모드
- Storybook, Husky, 단위 테스트

## 코드 포맷
- Prettier: 세미콜론 사용, 작은따옴표, 들여쓰기 2칸, trailing comma es5

## Git 커밋
- Conventional Commits: feat, fix, style, chore, docs, refactor
