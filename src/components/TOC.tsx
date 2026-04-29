'use client';

import { useEffect, useState } from 'react';

const TOC = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // id가 있는 h2 태그만 선택 (부제목 h2는 무시)
      const headings = Array.from(document.querySelectorAll('h2[id]'));
      if (headings.length === 0) return;

      let currentId = headings[0].id;

      for (const heading of headings) {
        // 화면 상단 기준 150px 위로 올라가면 해당 섹션으로 간주
        if (heading.getBoundingClientRect().top < 150) {
          currentId = heading.id;
        }
      }

      // 페이지의 맨 아래에 도달했는지 확인 (10px 오차 허용)
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (isBottom) {
        currentId = headings[headings.length - 1].id;
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 진입 시 활성화

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 80px offset for the sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-24 hidden text-sm lg:block">
      <h4 className="mb-4 font-bold text-foreground">목차</h4>
      <ul className="space-y-3 border-l-2 border-border pl-4">
        {['summary', 'problem', 'solution', 'result'].map((id) => {
          const labelMap: Record<string, string> = {
            summary: '요약',
            problem: '문제 상황',
            solution: '해결 과정',
            result: '결과 및 임팩트',
          };
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block transition-colors hover:text-foreground ${
                  activeId === id || (!activeId && id === 'summary')
                    ? 'font-medium text-accent'
                    : 'text-muted'
                }`}
              >
                {labelMap[id]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TOC;
