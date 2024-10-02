import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b border-gray-300 dark:border-gray-600 text-sm bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex-shrink-0 mr-4">
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-gray-800 truncate">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span className="text-gray-500 text-xs ml-2">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t border-gray-200 max-w-fit gap-4 text-gray-500">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`flex items-center ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                } hover:text-blue-500`}
              >
                <FaThumbsUp className="text-sm mr-1" />
                {comment.numberOfLikes > 0
                  ? `${comment.numberOfLikes} ${
                      comment.numberOfLikes === 1 ? "like" : "likes"
                    }`
                  : "Like"}
              </button>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
