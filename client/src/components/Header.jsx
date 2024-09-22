import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600
 rounded-lg text-white"
        >
          Inkflow
        </span>
      </Link>
      <form className="lg:w-80">
        <TextInput
          type="text"
          placeholder="Search Blog"
          rightIcon={IoSearch}
          className="hidden lg:inline " // Add custom width here
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <IoSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? (
            <MdSunny className="w-8" />
          ) : (
            <FaMoon className="w-8" />
          )}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                className=" transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl"
              />
            }
          >
            <Dropdown.Header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-t-lg text-white shadow-lg">
              <span className="block text-sm font-semibold">
                @{currentUser.username}
              </span>
              <span className="block text-xs truncate opacity-90">
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to="/dashboard?tab=profile">
              <Dropdown.Item className="hover:bg-gray-200 text-black transition duration-300 ease-in-out">
                Profile
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider className="my-2 border-purple-300" />

            <Dropdown.Item className="hover:bg-gray-200 text-black transition duration-300 ease-in-out">
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
