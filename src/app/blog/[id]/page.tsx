"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ProfilePic from '@/app/components/ProfilePic';

interface Blog {
  title: string;
  category: string;
  content: string;
  author: {
    username: string;
    email: string;
  };
  createdAt: Date;
}

export default function Page({ params }: any) {
  const { id } = params;
  const slicedId = id ? (id as string).slice(3) : null;

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.post('/api/blog/one', { slicedId });
        setBlog(response.data.blog);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    if (slicedId) {
      fetchBlog();
    }
  }, [slicedId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formattedDate = moment(blog.createdAt).format('MMMM Do YYYY');

  return (
    <main>
      <div className=' body w-10/12 p-4 lg:w-7/12'>
        <ProfilePic userData={blog.author}/>
        <div className=' text-right mt-6'>
        <span className=' text-gray-500 border-2 p-1 rounded-lg'>Category: {blog.category}</span>
        </div>
        
        <ReactMarkdown className="markdown"/>{blog.content}<ReactMarkdown/>
        {/* <p className=' font-medium'>Author~ {blog.author!.username}</p> */}
        <p className=' text-gray-500 text-right pt-4'>Created at:  {formattedDate}</p>
      </div>
    </main>
  );
}
