"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function Page() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
      const fetchAllBlogs = async () => {
        try {
          const response = await axios.get('/api/blog/all');
  
          setBlogs(response.data.blogs);
        } catch (error: any) {
          console.error(error.message);
        }
      };
  
      fetchAllBlogs();
    },[])

    
    return (
      <main>
        <div className='body w-10/12 lg:w-7/12'>
        {blogs.map((blog: any)=>(
          <div key={blog._id} className=' hover:cursor-pointer border-2 shadow-md rounded-lg p-4 my-4' onClick={()=>router.push(`blog/:${blog._id}`)}>
            <h1 className=' text-4xl font-bold'>{blog!.title}</h1>
            <p className=' font-medium'>Author~ {blog.author.username}</p>
            <p className=' text-gray-500'>Created at: {moment(blog.createdAt).format('MMMM Do YYYY')}</p>
            {/* <p className=' text-gray-500'>Category: {blog.category}</p> */}
          </div>
        ))}
        </div>
    </main>
  )
}
