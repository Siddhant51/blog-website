"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Toaster, toast} from 'react-hot-toast'

export default function page() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

  return (
    <div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        Dashboard{" "}
      <button
        onClick={logout}
        className="bg-blue-500 ml-4 hover:bg-blue-700 text-white p-2 rounded"
        >Logout</button>
    </div>
  )
}
