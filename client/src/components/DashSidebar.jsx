import { Sidebar } from "flowbite-react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56 bg-gray-800 text-gray-200 shadow-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Profile Section */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              icon={FaUser}
              active={tab === "profile"}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              label={"User"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {/* Sign Out Section */}
          <Sidebar.Item
            icon={FaSignOutAlt}
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
