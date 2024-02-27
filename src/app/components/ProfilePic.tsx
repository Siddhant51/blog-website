"use client"
import React from 'react';

// Image URL
const IMAGE_URL = "/userprofile.png";

interface UserData {
  username: string;
  email: string;
}

// ProfilePic component with Tailwind CSS
export default function ProfilePic({ userData }: { userData: UserData }) {
  {console.log(userData.username)}
  return (
    <div className=' w-full flex items-center flex-col border-b-4 pb-4 mb-4'>
    <div className=" w-60 h-60 rounded-full overflow-hidden flex-col">
      <img src={IMAGE_URL} alt="Profile" className="w-full h-full object-cover" />
    </div>
    <p className=' text-2xl'>Author~ {userData.username}</p>
      {/* <p className=' text-gray-500'>Email: {userData.email}</p> */}
    </div>
  );
}
