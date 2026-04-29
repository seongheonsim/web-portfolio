import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import TOC from '@/components/TOC';

import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Mermaid from '@/components/Mermaid';
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
    title: project ? `${project.title} | 심성헌` : 'Case Study',
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
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <h2 className="mb-8 text-xl font-medium text-muted">
              {project.subtitle}
            </h2>
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
            <h2 id="summary" className="scroll-mt-24 border-none pt-0">요약</h2>
            <div className="whitespace-pre-line leading-relaxed mb-8">
              {project.sections.summary}
            </div>

            <h2 id="problem" className="scroll-mt-24">문제 상황</h2>
            <div className="whitespace-pre-line leading-relaxed mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.sections.problem}
              </ReactMarkdown>
            </div>

            <h2 id="solution" className="scroll-mt-24">해결 과정</h2>
            <div className="leading-relaxed mb-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return (
                      <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card-bg/30 backdrop-blur-sm shadow-sm">
                        <table className="w-full border-collapse text-left text-sm text-muted">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-muted/10 text-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">{children}</thead>;
                  },
                  th({ children }) {
                    return <th className="px-6 py-3 font-bold">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-6 py-4 border-b border-muted/10 leading-relaxed">{children}</td>;
                  },
                }}
              >
                {project.sections.solution}
              </ReactMarkdown>
            </div>

            <h2 id="result" className="scroll-mt-24">결과 및 임팩트</h2>
            <div className="leading-relaxed">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table({ children }) {
                    return (
                      <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card-bg/30 backdrop-blur-sm shadow-sm">
                        <table className="w-full border-collapse text-left text-sm text-muted">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-muted/10 text-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">{children}</thead>;
                  },
                  th({ children }) {
                    return <th className="px-6 py-3 font-bold">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-6 py-4 border-b border-muted/10 leading-relaxed">{children}</td>;
                  },
                }}
              >
                {project.sections.result}
              </ReactMarkdown>
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
