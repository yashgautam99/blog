import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=4`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 z-10"></div>
        <div className="relative z-20">
          <Spinner size="xl" color="purple-500" />
        </div>
        <div className="absolute z-0 w-40 h-40 bg-purple-400 rounded-full opacity-50 animate-pulse"></div>
      </div>
    );

  return (
    <main className="p-6 flex flex-col max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-4xl mt-8 p-3 text-center font-serif text-gray-800 dark:text-white max-w-2xl mx-auto">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 rounded-lg shadow-md max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-4 border-b border-gray-300 mx-auto w-full max-w-2xl text-xs text-gray-600 dark:text-gray-400">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-4 max-w-2xl mx-auto w-full post-content text-gray-700 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full mb-6">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h2 className="text-xl mt-10 text-gray-800 dark:text-white">
          Recent Articles
        </h2>
        <div className="flex flex-wrap gap-6 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
      </div>
    </main>
  );
}
