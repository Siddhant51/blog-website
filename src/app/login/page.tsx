"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user);
            console.log("Login success", response.data);
            toast.success(response.data.message);
            router.push("/dashboard");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    return (
        <form className=' flex flex-col space-y-1'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1 className="text-lg font-semibold">Login</h1>
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
            <button type="submit" className=" border-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin} disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
            <Link href="/signup">Visit signup page</Link>
        </form>
    );
}
