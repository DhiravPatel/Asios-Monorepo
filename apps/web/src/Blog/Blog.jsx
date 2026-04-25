import React, { useMemo } from 'react';
import BlogCard from './BlogCard';
import { useGetAllBlogs } from '../hooks/Blog/BlogHook';

const Blog = () => {
  const { data: rawPosts, loading, error } = useGetAllBlogs();

  const blogPosts = useMemo(() => (
    (rawPosts || []).map((post, index) => ({
      id: post.$id || index + 1,
      date: new Date(post.$createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      gradient:
        index % 6 === 0 ? "from-blue-900 via-purple-900 to-blue-800" :
        index % 6 === 1 ? "from-purple-900 via-blue-900 to-purple-800" :
        index % 6 === 2 ? "from-gray-900 via-green-900 to-gray-800" :
        index % 6 === 3 ? "from-blue-900 via-teal-900 to-blue-800" :
        index % 6 === 4 ? "from-blue-900 via-cyan-900 to-blue-800" :
        "from-purple-900 via-indigo-900 to-purple-800",
      imageUrl: post.imageUrl,
      content: post.content,
      $createdAt: post.$createdAt,
      $updatedAt: post.$updatedAt
    }))
  ), [rawPosts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error?.message || 'Failed to fetch blog posts'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Asios Global, our blog is more than just industry updates—it's a curated destination for inspiration and innovation. 
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
