import { Sidebar } from "flowbite-react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaCommentAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaUserGroup } from "react-icons/fa6";

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56 bg-gray-800 text-gray-200 shadow-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {/* Profile Section */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              icon={FaUserCircle}
              active={tab === "profile"}
              as="div"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              label={currentUser.isAdmin ? "Admin" : "User"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                icon={FaTachometerAlt}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          {/* Sign Out Section */}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                icon={FaClipboardList}
                active={tab === "posts"}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  icon={FaUserGroup}
                  active={tab === "users"}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                  icon={FaCommentAlt}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            icon={FaSignOutAlt}
            onClick={handleSignout}
            className="flex items-center space-x-2 p-3 rounded-lg text-red-600 bg-red-200 dark:text-white dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 cursor-pointer transition-colors duration-200"
            as="div"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
