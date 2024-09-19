import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Badge } from "flowbite-react";
import { useState } from "react";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the formData state object with the new value from the input field
    // e.target.id is used to update the specific field (username, email, password)
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (which reloads the page)

    // Check if all required fields (username, email, password) are filled
    if (!formData.email || !formData.password) {
      // If any field is missing, set an error message and stop the process
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      // Set loading to true to show the user something is happening (e.g., a spinner)
      setLoading(true);

      // Clear any previous error messages
      setErrorMessage(null);

      // Send the form data to the server via a POST request
      const res = await fetch("/api/auth/signin", {
        method: "POST", // Using POST method to send data
        headers: { "Content-Type": "application/json" }, // Ensure the request is sent as JSON
        body: JSON.stringify(formData), // Convert the form data object to a JSON string to send
      });

      // Parse the JSON response from the server
      const data = await res.json();

      // Check if the server responded with a success = false
      if (data.success === false) {
        // If there's an error, display the error message from the server
        return setErrorMessage(data.message);
      }

      // Stop the loading spinner
      setLoading(false);

      // If the request was successful (res.ok is true), navigate to the sign-in page
      if (res.ok) {
        navigate("/home");
      }
    } catch (error) {
      // If there's a network or server error, display it
      setErrorMessage(error.message);

      // Stop the loading spinner
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

        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                placeholder="*********"
                id="password"
                className="mt-2 rounded-full focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                onChange={handleChange}
              />
            </div>
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
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 mt-3">
            <span>Don't have an account </span>
            <Badge color="indigo">
              <Link
                to="/sign-up"
                className="text-sm font-medium text-purple-500 hover:underline"
              >
                Sign Up
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

export default SignIn;
