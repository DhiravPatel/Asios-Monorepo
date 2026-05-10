import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = slugify(post.title);
    navigate(`/blog/${slug}`, { state: { post } });
  };

  return (
    <article className="group cursor-pointer flex flex-col" onClick={handleClick}>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
        <img
          src={post.imageUrl || "https://via.placeholder.com/600x800"}
          alt={post.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x800";
          }}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
      </div>

      <div className="mt-5 flex items-center gap-3 text-[10.5px] tracking-[0.22em] uppercase text-sand-500">
        <span className="w-6 h-px bg-primary" />
        <span>{post.date}</span>
      </div>
      <h3 className="display text-2xl md:text-[26px] leading-[1.2] mt-3 group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="mt-3 text-[14px] text-sand-600 leading-[1.75] line-clamp-3">
        {post.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-ink">
        Read story
        <FiArrowUpRight className="w-3.5 h-3.5 text-primary transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      </span>
    </article>
  );
};

export default BlogCard;
