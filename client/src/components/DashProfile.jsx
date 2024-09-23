import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-6 w-full space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
        Profile
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Welcome to your dashboard profile
      </p>

      <form className="flex flex-col gap-5">
        {/* Profile Picture */}
        <div className="w-36 h-36 self-center relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-4 border-gray-300 object-cover z-10 relative"
          />
        </div>

        {/* Username Input */}
        <div className="relative">
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="text-gray-800 dark:text-gray-200  dark:border-gray-600 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="text-gray-800 dark:text-gray-200   dark:border-gray-600 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <TextInput
            type="password"
            id="password"
            placeholder="Password"
            className="text-gray-800 dark:text-gray-200  dark:border-gray-600 focus:ring-blue-500"
          />
        </div>

        {/* Update Profile Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
        >
          Update Profile
        </button>
      </form>

      {/* Bottom Options */}
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mt-6">
        <button className="text-red-500 hover:text-red-600 font-semibold transition">
          Delete Account
        </button>
        <button className="text-blue-500 hover:text-blue-600 font-semibold transition">
          Sign out
        </button>
      </div>
    </div>
  );
}

export default DashProfile;
