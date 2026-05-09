import React, { useMemo } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useGetAllBlogs } from "../hooks/Blog/BlogHook";
import SkeletonLoader from "../SkeletonLoader";

const SKELETON_COUNT = 6;

const Blog = () => {
  const { data: rawPosts, loading, error } = useGetAllBlogs();

  const blogPosts = useMemo(
    () =>
      (rawPosts || []).map((post, index) => ({
        id: post.$id || index + 1,
        date: new Date(post.$createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        title: post.title,
        description:
          post.content?.replace(/<[^>]*>/g, "").substring(0, 160).trim() + "…",
        imageUrl: post.imageUrl,
        content: post.content,
        $createdAt: post.$createdAt,
      })),
    [rawPosts]
  );

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pt-20 md:pt-28 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Journal</span>
            </div>
            <h1 className="display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Notes from the <br />
              <span className="display-italic text-primary">Asios journal.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-sand-600 leading-[1.85] max-w-2xl">
              Industry updates, product stories, and field notes. A curated read for designers,
              specifiers, and anyone curious about what makes a surface endure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          {loading ? (
            <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={`skeleton-${i}`}>
                  <div className="aspect-[4/5]">
                    <SkeletonLoader width="100%" height="100%" />
                  </div>
                  <div className="mt-5">
                    <SkeletonLoader width="40%" height="11px" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader width="90%" height="22px" />
                  </div>
                  <div className="mt-2">
                    <SkeletonLoader width="70%" height="14px" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 border border-dashed border-sand-300">
              <p className="text-primary text-[15px]">
                {error?.message || "Failed to load posts. Please try again."}
              </p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-sand-300">
              <p className="text-sand-500 text-[15px]">No posts published yet.</p>
            </div>
          ) : (
            <div className="grid gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
