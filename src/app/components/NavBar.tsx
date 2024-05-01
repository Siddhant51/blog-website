"use client";

import { useAppContext } from "@/context/Index";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useAppContext();

  useEffect(() => {
    const v = sessionStorage.getItem("loggedIn") || false;
    setLoggedIn(v);
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      sessionStorage.setItem("loggedIn", "false");
      setLoggedIn("");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  console.log(pathname);

  return (
    <div className=" text-lg flex justify-center w-full border-b-2 shadow-lg fixed top-0 z-10 bg-white">
      <div className=" w-11/12 p-4 flex flex-row justify-between items-center">
        <h1 className=" text-2xl font-bold">Blog Website</h1>
        {loggedIn ? (
          <div>
            <Link
              className={
                pathname === "/"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href="/"
            >
              Home
            </Link>
            <Link
              className={
                pathname === "/dashboard"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className={
                pathname === "/create"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href={"/create"}
            >
              Create
            </Link>
            <button
              onClick={logout}
              className="bg-blue-500 ml-4 hover:bg-blue-700 text-white p-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              className={
                pathname === "/"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={
                pathname === "/signup"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href={"/signup"}
            >
              Signup
            </Link>
            <Link
              className={
                pathname === "/login"
                  ? " mx-3 font-semibold"
                  : "mx-3 hover:font-semibold"
              }
              href={"/login"}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
