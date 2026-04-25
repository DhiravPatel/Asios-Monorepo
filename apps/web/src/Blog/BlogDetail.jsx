import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BlogDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [post, setPost] = useState(state?.post || null);
  const [loading, setLoading] = useState(!state?.post);
  const [error, setError] = useState(null);

  // Helper function to generate clean meta description from HTML content
  const generateMetaDescription = (content, maxLength = 160) => {
    if (!content) return 'Read our latest blog post about tiles and construction materials.';
    
    // Strip HTML tags and clean up the content
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    // Truncate to maxLength and ensure it ends with a sentence
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    const truncated = cleanContent.substring(0, maxLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    );
    
    return lastSentenceEnd > maxLength * 0.7 
      ? truncated.substring(0, lastSentenceEnd + 1)
      : truncated + '...';
  };

  // Generate meta data
  const metaTitle = "Best Tiles Manufacturer in Somalia | Asios Global";
  const metaDescription = 'Are you in Somalia and looking for tiles manufacturers who can supply best tiles for you then here are the best tiles manufacturer in Somalia with high reputation'
  const metaImage = post?.imageUrl || '/asios_logo.svg';
  const metaUrl = `${window.location.origin}/blog/${id}`;
  const metaKeywords = 'Best Tiles Manufacturer in Somalia, Best Tiles Supplier in Somalia, Best Tiles Exporter in Somalia';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-600 text-lg mb-4">Error loading blog post</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No blog post found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:site_name" content="Asios Global" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Asios Global" />
        <link rel="canonical" href={metaUrl} />
      </Helmet>
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        </header>

        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[26rem] object-cover rounded-lg shadow-lg"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
