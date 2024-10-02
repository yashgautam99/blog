import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="hero-section relative flex flex-col items-center justify-center gap-6 p-10 lg:p-28 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold lg:text-7xl text-gray-900 dark:text-gray-100 leading-tight">
          Welcome to My Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
          Discover a collection of articles, tutorials, and insights on web
          development, software engineering, and programming languages. Stay
          up-to-date with the latest trends and tips.
        </p>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        {posts && posts.length > 0 ? (
          <div className="recent-posts">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
              All Posts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} className="w-full" />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
