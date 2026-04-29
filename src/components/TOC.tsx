'use client';

import { useEffect, useState } from 'react';

const TOC = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    const headings = document.querySelectorAll('h2');
    headings.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
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
