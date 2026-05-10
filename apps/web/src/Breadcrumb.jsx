import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [], className = "" }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`relative bg-ink/85 backdrop-blur-xl text-white border-b border-white/10 overflow-hidden ${className}`}
    >
      {/* ambient red shimmer — same as the header marquee strip */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-72 h-32 bg-primary/25 rounded-full blur-3xl" />
        <div className="absolute -top-6 right-1/4 w-80 h-32 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-3 md:py-3.5">
        <ol className="flex items-center flex-wrap gap-2 text-[10.5px] tracking-[0.22em] uppercase">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="text-white/55 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`flex items-center gap-2 ${
                      isLast ? "text-white" : "text-white/55"
                    }`}
                  >
                    {isLast && (
                      <span
                        className="w-1 h-1 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="text-white/25" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
