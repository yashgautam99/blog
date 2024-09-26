import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Badge } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth"; // Assuming OAuth component handles Google login, etc.

function Signup({ page }) {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg text-white">
              Inkflow
            </span>
          </Link>
          <p className="text-3xl mt-5 font-bold leading-tight tracking-tight ">
            Unleash Your Thoughts, Inspire the World
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex gap-2 items-center">
                <FaUser />
                <Label value="Your username " className="text-xl" />
              </div>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="mt-3"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <div className="flex gap-2 items-center">
                <MdEmail />
                <Label value="Your email " className="text-xl" />
              </div>
              <TextInput
                type="email"
                placeholder="name@example.com"
                id="email"
                className="mt-2"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <div className="flex gap-2 items-center">
                <FaLock />
                <Label value="Your password " className="text-xl" />
              </div>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                className="mt-2 rounded-full focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                onChange={handleChange}
              />
            </div>
            {/* Sign Up Button */}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            {/* OAuth Signup Button */}
            <OAuth page="signup" />
            {/* Placing OAuth button after form submission */}
          </form>

          <div className="flex flex-wrap gap-2 mt-3">
            <span>Have an account </span>
            <Badge color="indigo">
              <Link
                to="/sign-in"
                className="text-sm font-medium text-purple-500 hover:underline"
              >
                Sign In
              </Link>
            </Badge>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
