"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import moment from "moment";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

export default function Page() {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/me");

        setBlogs(response.data.user.blogs);
        setUsername(response.data.user.username);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <main>
      <div className="body flex flex-row flex-wrap w-11/12">
        <Toaster position="top-right" reverseOrder={false} />

        {blogs.map((blog: any) => (
          <div className="w-1/2 md:w-2/6 lg:w-1/4 p-2">
            <div
              key={blog._id}
              className="card border-2 shadow-md rounded-lg p-2 cursor-pointer hover:shadow-xl over:transform hover:scale-105"
              onClick={() => router.push(`blog/:${blog._id}`)}
            >
              <div className="card-image h-48 w-full border-2 rounded-lg bg-gray-200"></div>
              <div className="category text-blue-600"> {blog.category} </div>
              <div className="heading font-semibold break-words overflow-hidden">
                {blog!.title}
              </div>
              <div className="author text-base text-gray-500">
                {" "}
                By{" "}
                <span className="name font-semibold">
                  {blog.author.username}
                </span>{" "}
                on <span>{moment(blog.createdAt).format("Do' MMM YYYY")}</span>
              </div>
              <div className="like flex justify-end">
                <IoIosHeartEmpty />
                {/* <IoIosHeart /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
