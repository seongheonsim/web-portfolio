# 개발 컨벤션 — 포트폴리오 웹사이트

> **프로젝트 성격**: 1인 개발, Next.js + TailwindCSS 기반 정적 포트폴리오 웹사이트  
> **원칙**: 최소한의 규칙으로 최대한의 일관성. 과잉 엔지니어링 금지.

---

## 1. 코드 포맷팅 & 린팅 (자동화)

| 도구 | 역할 | 설정 |
|------|------|------|
| **ESLint** | 코드 품질 검사 | `create-next-app` 기본 설정 유지 |
| **Prettier** | 코드 포맷 통일 | 세미콜론 사용, 작은따옴표, 들여쓰기 2칸 |

### Prettier 설정 (`.prettierrc`)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

---

## 2. 파일 / 폴더 네이밍

| 대상 | 컨벤션 | 예시 |
|------|--------|------|
| 컴포넌트 파일 | **PascalCase** | `Header.tsx`, `ProjectCard.tsx` |
| 페이지 (App Router) | Next.js 기본 규칙 | `page.tsx`, `layout.tsx` |
| 유틸/데이터 파일 | **camelCase** | `experience.ts`, `projects.ts` |
| 타입 정의 파일 | **camelCase** | `project.ts` (types 폴더 내) |
| 폴더명 | **kebab-case** | `components/`, `data/`, `case-studies/` |

---

## 3. 디렉토리 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 글로벌 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── projects/
│       └── [slug]/
│           └── page.tsx    # 케이스 스터디 상세 페이지
├── components/             # 재사용 가능한 UI 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── ProjectCard.tsx
│   └── TOC.tsx
├── data/                   # 정적 데이터 (콘텐츠)
│   ├── experience.ts
│   └── projects.ts
└── types/                  # TypeScript 타입 정의
    └── project.ts
```

---

## 4. 컴포넌트 작성 규칙

### 함수 선언 방식
- **화살표 함수 + `export default`** 통일

```tsx
const Header = () => {
  return (
    <header>
      {/* ... */}
    </header>
  );
};

export default Header;
```

### Props 타입 정의
- 이 규모에서는 **인라인 타입**으로 충분. 재사용이 필요한 경우에만 `interface`로 분리.

```tsx
// ✅ 간단한 경우 — 인라인
const ProjectCard = ({ title, slug }: { title: string; slug: string }) => {
  // ...
};

// ✅ Props가 많은 경우 — interface 분리
interface ProjectCardProps {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  period: string;
}
```

### Server Component vs Client Component
- **기본은 Server Component** (별도 선언 없음)
- 브라우저 API나 인터랙션(`useState`, `useEffect`, `onClick` 등)이 필요한 경우에만 파일 최상단에 `"use client"` 선언

---

## 5. 스타일링 규칙 (TailwindCSS)

- **인라인 Tailwind 클래스** 사용을 기본으로 함.
- 클래스가 너무 길어지면 가독성을 위해 줄바꿈.
- 커스텀 CSS는 최소화. `globals.css`에 필요한 경우에만 추가.
- `@tailwindcss/typography`의 `prose` 클래스를 활용해 장문 콘텐츠의 타이포그래피 처리.

---

## 6. Git 컨벤션

### 커밋 메시지 (Conventional Commits)
```
<type>: <subject>

예시:
feat: Hero 섹션 컴포넌트 구현
fix: 모바일 GNB 레이아웃 깨짐 수정
style: ProjectCard 여백 조정
chore: Prettier 설정 추가
docs: 컨벤션 문서 작성
```

| Type | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/스타일 변경 (기능 변화 없음) |
| `chore` | 빌드, 설정 등 기능 외 작업 |
| `docs` | 문서 관련 |
| `refactor` | 리팩토링 |

### 브랜칭
- **`main` 단일 브랜치** 운영 (1인 프로젝트)

---

## 7. 이 프로젝트에서 사용하지 않는 것들

과잉 엔지니어링을 방지하기 위해 아래 항목들은 명시적으로 **사용하지 않습니다.**

- ❌ Husky / lint-staged (1인 프로젝트)
- ❌ Storybook (컴포넌트 수가 적음)
- ❌ 상태 관리 라이브러리 (Redux, Zustand 등 — 정적 데이터만 다룸)
- ❌ 단위 테스트 (정적 사이트에는 ROI 낮음)
- ❌ 다크 모드

---

*작성: 2026-04-29*
