import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const Home = () => {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-6">
        <Hero />
        <About />
        <Experience />
        <section id="projects" className="border-t border-border py-16 scroll-mt-20">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Key Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
