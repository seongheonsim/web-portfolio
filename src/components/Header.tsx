import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-end px-6">
        <nav className="flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/#experience"
            className="hover:text-foreground transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/#projects"
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
