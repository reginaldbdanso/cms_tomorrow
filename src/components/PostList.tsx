import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Clock, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  excerpt: string;
  category: string;
  readTime: string;
  coverImage: string;
  authorImage: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_POSTS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_POSTS_API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again later.');
    }
  }

  if (loading) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center">No posts found.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id} className="text-2xl font-semibold text-blue-600 hover:text-blue-800">
             
        <article key={post._id} className="bg-white rounded-xl overflow-hidden shadow-lg mb-12 relative">
          <>
            <button
              onClick={(e) => {
          e.preventDefault();
          deletePost(post._id);
              }}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/4">
          <img
            className="h-64 w-84 object-cover md:h-full"
            src={post.coverImage}
            alt={post.title}
          />
              </div>
              <div className="p-8 md:w-1/2">
          <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
            {post.category}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full mr-4"
              src={post.authorImage}
              alt={post.author}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
              </div>
            </div>
          </>
        </article>
        </Link>
      ))}
    </div>
  );
};

export default PostList;