const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} SeongHeon Sim. All rights reserved.
        </p>
        <a
          href="https://github.com/seongheonsim"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
