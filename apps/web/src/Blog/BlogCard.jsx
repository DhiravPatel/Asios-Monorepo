import React from 'react';
import { useNavigate } from 'react-router-dom';

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = slugify(post.title);
    navigate(`/blog/${slug}`, { state: { post } });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={`relative h-64 bg-gradient-to-br ${post.gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img
            src={post.imageUrl || "https://via.placeholder.com/300x200"}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x200";
            }}
          />
        </div>
      </div>
      <div className="p-6 pt-[4px] bg-white">
        <h3 className="mb-4 text-xl font-bold text-gray-900">{post.title}</h3>
        <p className="mb-6 text-sm text-gray-600">{post.description}</p>
        <button
          onClick={handleClick}
          className="group flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          <span>Know More</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
