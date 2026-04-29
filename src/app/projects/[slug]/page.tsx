import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import TOC from '@/components/TOC';

import { Metadata } from 'next';

export const generateStaticParams = () => {
  return projects.map((project) => ({
    slug: project.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} - SeongHeon Sim` : 'Case Study',
    description: project?.summary,
  };
};

const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 bg-background">
      <article className="mx-auto max-w-5xl px-6 py-16 lg:flex lg:gap-16">
        {/* 본문 영역 */}
        <div className="lg:w-3/4">
          <header className="mb-12 border-b border-border pb-8">
            <div className="mb-4 text-sm font-medium text-accent">
              {project.period}
            </div>
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-slate max-w-none prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground hover:prose-a:text-accent-hover">
            <h2 id="summary" className="scroll-mt-24 border-none pt-0">
              요약
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {project.sections.summary}
            </p>

            <h2 id="problem" className="scroll-mt-24">
              문제 상황
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {project.sections.problem}
            </p>

            <h2 id="solution" className="scroll-mt-24">
              해결 과정
            </h2>
            <div className="whitespace-pre-line leading-relaxed">
              {/* @tailwindcss/typography가 기본 마크다운 스타일을 입혀줌 */}
              {project.sections.solution.split('\n\n').map((paragraph, i) => {
                // 초간단 볼드체 파싱 (**text**)
                const formatted = paragraph.split(/(\*\*.*?\*\*)/).map((chunk, j) => {
                  if (chunk.startsWith('**') && chunk.endsWith('**')) {
                    return <strong key={j}>{chunk.slice(2, -2)}</strong>;
                  }
                  return chunk;
                });
                return <p key={i}>{formatted}</p>;
              })}
            </div>

            <h2 id="result" className="scroll-mt-24">
              결과 및 임팩트
            </h2>
            <div className="leading-relaxed">
              <ul className="list-disc pl-5">
                {project.sections.result
                  .split('\n')
                  .filter((line) => line.startsWith('- '))
                  .map((line, i) => {
                    const content = line.substring(2);
                    const formatted = content.split(/(\*\*.*?\*\*)/).map((chunk, j) => {
                      if (chunk.startsWith('**') && chunk.endsWith('**')) {
                        return <strong key={j}>{chunk.slice(2, -2)}</strong>;
                      }
                      return chunk;
                    });
                    return <li key={i}>{formatted}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>

        {/* TOC 영역 */}
        <aside className="hidden lg:block lg:w-1/4">
          <TOC />
        </aside>
      </article>
    </main>
  );
};

export default ProjectDetail;
