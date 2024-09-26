import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="0">Select Category</option>
            <option value="1">Technology</option>
            <option value="2">Lifestyle</option>
            <option value="3">Business</option>
            <option value="4">Travel</option>
            <option value="5">Health</option>
            <option value="6">Food</option>
            <option value="7">Education</option>
            <option value="8">Entertainment</option>
            <option value="9">Finance</option>
            <option value="10">Fashion</option>
            <option value="11">Sports</option>
            <option value="12">News</option>
            <option value="13">Personal Development</option>
            <option value="14">Environment</option>
            <option value="15">Art</option>
            <option value="16">Science</option>
            <option value="17">Music</option>
            <option value="18">Photography</option>
            <option value="19">Parenting</option>
            <option value="20">DIY & Crafts</option>
            <option value="21">Books</option>
            <option value="22">Gaming</option>
            <option value="23">Real Estate</option>
            <option value="24">Politics</option>
            <option value="25">Automotive</option>
            <option value="26">Pets</option>
            <option value="27">Relationships</option>
            <option value="28">Movies & TV</option>
            <option value="29">Startups</option>
            <option value="30">Fitness</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write Something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
