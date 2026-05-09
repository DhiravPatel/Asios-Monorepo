import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [], className = "" }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-cream border-b border-sand-200 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-4">
        <ol className="flex items-center flex-wrap gap-2 text-[11px] tracking-[0.18em] uppercase">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="text-sand-500 hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-ink" : "text-sand-500"}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="text-sand-300" aria-hidden="true">
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
