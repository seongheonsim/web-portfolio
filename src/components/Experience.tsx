import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className="border-t border-border py-16 scroll-mt-20">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Experience
      </h2>
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="mt-1 text-sm font-medium text-muted">
              {exp.period}
            </div>
            <div className="md:col-span-3">
              <h3 className="text-lg font-semibold text-foreground">
                {exp.company}
              </h3>
              <div className="mb-4 font-medium text-accent">{exp.role}</div>
              <p className="leading-relaxed text-muted">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
