import { Alert, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref, // <-- Import ref here
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName); // <-- Corrected ref
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full "
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

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
