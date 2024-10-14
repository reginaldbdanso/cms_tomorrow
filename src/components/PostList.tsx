import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
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
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow-md rounded-lg p-6">
          <Link to={`/post/${post._id}`} className="text-2xl font-semibold text-blue-600 hover:text-blue-800">
            {post.title}
          </Link>
          <p className="mt-2 text-gray-600">{post.content.substring(0, 150)}...</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <User size={16} className="mr-1" />
            <span className="mr-4">{post.author}</span>
            <Clock size={16} className="mr-1" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;