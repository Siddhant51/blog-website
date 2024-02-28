"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/Index";

export default function Page() {
    const router = useRouter();

    const {loggedIn, setLoggedIn} = useAppContext();

    const [user, setUser] = useState({
        email: "sid@gmail.com",
        password: "123456"
    });
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user);
            console.log("Login success", response.data);
            toast.success(response.data.message);
            sessionStorage.setItem("loggedIn", "true")
            setLoggedIn("true")
            router.push("/dashboard")
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    return (
        <main>
        <div className=" sub flex items-center justify-center">

        <form className=' flex flex-col space-y-4 border-2 p-5 shadow-lg rounded-lg'>
            <h1 className="text-2xl text-center font-semibold pb-5">Login</h1>
            <label>
                Email:
                <input
                    className=' border-2 ml-2'
                    type="eamil"
                    value={user.email}
                    onChange={(e)=>setUser({...user, email : e.target.value })}
                    required
                    />
            </label>
            <label>
                Password:
                <input
                    className=' border-2 ml-2'
                    type="password"
                    value={user.password}
                    onChange={(e)=>setUser({...user, password : e.target.value })}
                    required
                    />
            </label>
            <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white p-1 rounded" onClick={onLogin} disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
            <Link href="/signup">Visit signup page</Link>
        </form>
        </div>
    </main>
    );
}
