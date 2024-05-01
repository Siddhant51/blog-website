"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
// Import necessary libraries
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import moment from "moment";

// Create the Page component
export default function Page() {
  const router = useRouter();

  // State to manage form inputs
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onPost = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/blog/create", blog);
      console.log("Blog posted successfully", response.data);
      toast.success(response.data.message);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Error posting blog", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="body flex flex-col w-11/12 lg:w-full lg:flex-row lg:justify-evenly">
        {/* Blog Creation Form */}
        <form className=" flex flex-col lg:w-5/12">
          <div className=" my-2">
            <label
              htmlFor="title"
              className="block font-semibold text-gray-700 w-full"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blog.title}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  title: e.target.value,
                  content: `# ${e.target.value}`,
                })
              }
              className="mt-1 p-2 w-full border-2 shadow-md rounded-md"
            />
          </div>
          <div className=" my-2">
            <label
              htmlFor="category"
              className="block font-semibold text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={blog.category}
              onChange={(e) => setBlog({ ...blog, category: e.target.value })}
              className="mt-1 p-2 w-full border-2 shadow-md rounded-md"
            />
          </div>
          <div className=" my-2">
            <label
              htmlFor="content"
              className=" block font-semibold text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="mt-1 p-2 w-full border-2 shadow-md rounded-md min-h-80"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
            onClick={onPost}
            disabled={loading}
          >
            {loading ? "Loading..." : "Post"}
          </button>
        </form>

        {/* Blog Content Preview */}
        <div className="mt-3 lg:w-5/12">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className="markdown">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
