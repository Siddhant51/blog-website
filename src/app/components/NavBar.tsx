"use client"

import { useAppContext } from '@/context/Index'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function NavBar() {
    const router = useRouter()
    const {loggedIn, setLoggedIn} = useAppContext()

  useEffect(() => {
    const v = localStorage.getItem("loggedIn") || false;
    setLoggedIn(v);
  }, []);

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            toast.success('Logout successful')
            localStorage.removeItem("loggedIn")
            setLoggedIn(false)
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

  return (
    <div className=' flex justify-center w-full border-b-2 shadow-md fixed top-0 z-10 bg-white'>
      <div className=' w-4/5 p-4 flex flex-row justify-between items-center'>
        <p>Blog-website</p>
        {loggedIn ? <div>
            <Link className=' mx-3' href={"/"}>Home</Link>
            <Link className=' mx-3' href={"/dashboard"}>Dashboard</Link>
            <Link className=' mx-3' href={"/create"}>Create</Link>
            <button
            onClick={logout}
            className="bg-blue-500 ml-4 hover:bg-blue-700 text-white p-1 rounded"
            >
                Logout
            </button>
        </div> : <div>
            <Link className=' mx-3' href={"/"}>Home</Link>
            <Link className=' mx-3' href={"/signup"}>Signup</Link>
            <Link className=' mx-3' href={"/login"}>Login</Link>
            </div>
        }
        
      </div>
    </div>
  )
}
