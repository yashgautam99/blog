import { Alert, TextInput, Modal, ModalBody, Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref, // Corrected import for ref
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateUserSucess, setUpdateUserSucess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateUserSucess || updateUserError) {
      const timer = setTimeout(() => {
        setUpdateUserSucess(null);
        setUpdateUserError(null);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [updateUserSucess, updateUserError]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is larger than 2MB
      if (file.size > 2 * 1024 * 1024) {
        setImageFileUploadError("File size exceeds 2MB");
        return;
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // Upload image to Firebase
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null); // Clear previous errors
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName); // Corrected ref usage
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
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSucess(null);

    // Prevent submission if no changes are made
    if (!Object.keys(formData).some((key) => formData[key])) {
      setUpdateUserError("No changes made to update");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while uploading the image");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSucess("User successfully updated");
        setImageFileUploadProgress(null);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError("An error occurred while updating the user");
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
    <div className="max-w-lg mx-auto p-6 w-full space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
        Profile
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Welcome to your dashboard profile
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          {imageFileUploadProgress !== null && (
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
            value={formData.username || currentUser.username}
            className="text-gray-800 dark:text-gray-200  dark:border-gray-600 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email || currentUser.email}
            className="text-gray-800 dark:text-gray-200   dark:border-gray-600 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <TextInput
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password || ""}
            className="text-gray-800 dark:text-gray-200  dark:border-gray-600 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        {/* Update Profile Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Updating..."}
        </button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>

      {/* Bottom Options */}
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mt-6">
        <button
          className="text-red-500 hover:text-red-600 font-semibold transition"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </button>
        <button
          className="text-blue-500 hover:text-blue-600 font-semibold transition"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </div>
      {updateUserSucess && (
        <Alert color="success" className="mt-5">
          {updateUserSucess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProfile;
