import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/types/project';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-border bg-card-bg p-6 transition-all hover:border-accent hover:shadow-sm"
    >
      <div className="mb-4 text-sm font-medium text-muted">
        {project.period}
      </div>
      <h3 className="mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mb-6 line-clamp-3 leading-relaxed text-muted">
        {project.summary}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center text-sm font-bold text-accent">
        상세 보기
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProjectCard;
