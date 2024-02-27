"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Signup success", response.data);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error.message);
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
    <div className="sub flex items-center justify-center">

    <form className="flex flex-col space-y-4 border-2 p-5 shadow-lg rounded-lg">
      <Toaster
        position="top-right"
        reverseOrder={false}
        />
      <h1 className="text-2xl text-center font-semibold pb-5">Signup</h1>
      <label>
        Username:
        <input
          className="border-2 ml-2"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
          />
      </label>
      <label>
        Email:
        <input
          className="border-2 ml-2"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          />
      </label>
      <label>
        Password:
        <input
          className="border-2 ml-2"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          />
      </label>
      <button
        type="submit"
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
        disabled={loading}
        >
        {loading ? "Loading..." : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </form>
      </div>
      </main>
  );
}
