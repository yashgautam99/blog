import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-6 mx-auto max-w-9xl">
      {/* Statistics Section */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Users Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm uppercase">Total Users</h3>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="text-5xl bg-white text-teal-700 rounded-full p-3 shadow-md" />
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-green-400 flex items-center">
              <HiArrowNarrowUp className="mr-1" />
              {lastMonthUsers}
            </span>
            <span className="ml-2 text-gray-300">Last month</span>
          </div>
        </div>

        {/* Comments Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm uppercase">Total Comments</h3>
              <p className="text-3xl font-bold">{totalComments}</p>
            </div>
            <HiAnnotation className="text-5xl bg-white text-indigo-700 rounded-full p-3 shadow-md" />
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-green-400 flex items-center">
              <HiArrowNarrowUp className="mr-1" />
              {lastMonthComments}
            </span>
            <span className="ml-2 text-gray-300">Last month</span>
          </div>
        </div>

        {/* Posts Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-lime-500 to-lime-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm uppercase">Total Posts</h3>
              <p className="text-3xl font-bold">{totalPosts}</p>
            </div>
            <HiDocumentText className="text-5xl bg-white text-lime-700 rounded-full p-3 shadow-md" />
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-green-400 flex items-center">
              <HiArrowNarrowUp className="mr-1" />
              {lastMonthPosts}
            </span>
            <span className="ml-2 text-gray-300">Last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-700">
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt="user"
                      className="w-10 h-10 rounded-full bg-gray-300"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        {/* Recent Comments */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Comments</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-700">
                  <Table.Cell className="w-96">
                    <p className="line-clamp-2">{comment.content}</p>
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        {/* Recent Posts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=posts">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-700">
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt="post"
                      className="w-14 h-10 rounded-md bg-gray-300"
                    />
                  </Table.Cell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
