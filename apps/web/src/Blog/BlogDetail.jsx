import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

const BlogDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [post] = useState(state?.post || null);
  const [loading] = useState(!state?.post);
  const [error] = useState(null);

  const formattedDate = post?.$createdAt
    ? new Date(post.$createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const metaTitle = post?.title
    ? `${post.title} | Asios Global Journal`
    : "Asios Global Journal";
  const metaDescription = post?.content
    ? post.content.replace(/<[^>]*>/g, "").substring(0, 160).trim()
    : "Notes from Asios Global — industry updates, product stories, and field notes.";
  const metaImage = post?.imageUrl || "/asios_logo.svg";
  const metaUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${id}` : "";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border border-sand-300 border-t-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
        <div>
          <p className="display text-2xl mb-3">Something went wrong</p>
          <p className="text-sand-500 text-[14px]">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="display text-2xl mb-3">Post not found</p>
          <Link to="/blog" className="btn-link">
            Return to Journal <FiArrowUpRight className="arrow w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:site_name" content="Asios Global" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Asios Global" />
        <link rel="canonical" href={metaUrl} />
      </Helmet>

      {/* Header */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pt-14 md:pt-20 pb-16 md:pb-24">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-sand-600 hover:text-ink transition-colors mb-10"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Journal</span>
              {formattedDate && (
                <span className="text-[10.5px] tracking-[0.22em] uppercase text-sand-500">
                  · {formattedDate}
                </span>
              )}
            </div>
            <h1 className="display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero image */}
      {post.imageUrl && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 -mt-8 md:-mt-12">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[360px] md:h-[520px] lg:h-[600px] object-cover shadow-lift"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="prose-blog">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-16 pt-10 border-t border-sand-200 flex flex-wrap items-center justify-between gap-4">
          <Link to="/blog" className="btn-link">
            <FiArrowLeft className="w-4 h-4" /> All Posts
          </Link>
          <Link to="/contact" className="btn-link">
            Get in Touch <FiArrowUpRight className="arrow w-4 h-4" />
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogDetail;
