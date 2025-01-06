/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginBtnDisable, setLoginBtnDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  // handeling onSubmiting
  const onSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);
      console.log("Successfully login", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("SignUp faild");
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (
      (user.email.length > 0,
      user.password.length > 0)
    ) {
      setLoginBtnDisable(false);
    } else {
      setLoginBtnDisable(true);
    }
  }, [user]);

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="w-full sm:w-1/2">
        <h2 className="text-3xl text-center text-slate-100">{loading ? "processing" : "Login"}</h2>
        <form className="mt-10" action="">
          <div className="bg-gray-800 w-full h-[1px]"></div>
          <div className="mt-10 px-3 space-y-5">
            
            <div className="space-y-1">
              <label className="mr-3 after:content-['*'] after:ml-0.5 after:text-red-500 block" htmlFor="username">Username</label>
            <input
              type="email"
              value={user.email}
              onChange={(e: any) => setUser({...user, email:e.target.value})}
              placeholder="Email"
              id="email"
              className="bg-gray-800 rounded w-full pl-2 py-1 placeholder:text-gray-600"
            />
            </div>
            <div className="space-y-1">
              <label className="mr-3 after:content-['*'] after:ml-0.5 after:text-red-500 block" htmlFor="username">Username</label>
            <input
              type="password"
              value={user.password}
              onChange={(e: any) => setUser({...user, password:e.target.value})}
              placeholder="Password"
              id="password"
              className="bg-gray-800 rounded w-full pl-2 py-1 placeholder:text-gray-600"
            />
            </div>
            <button disabled={loginBtnDisable} onClick={onSubmit} type="submit" className="w-full bg-slate-200 hover:scale-95 active:bg-slate-300 rounded-full px-5 py-1 text-black font-semibold">{ loginBtnDisable ? "Fill Please" : "Login" }</button>
            <p className="text-sm text-center text-gray-400">Dont&apos;t have Account? <Link className="text-gray-200" href="/signup">SignUp here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage
