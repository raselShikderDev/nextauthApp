"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const [data, setData] = useState("");
  const router = useRouter()
  // geting user Data
  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data._id);
    } catch (error) {
      console.log("User Data not found: ", error);
    }
  };

  // Handling User logout
  const userLogOut = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout Successfully")
      router.push("/login")
    } catch (error) {
      console.log(error)
      toast.error("Logout faild")
    }
  }
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="w-full sm:w-1/2">
        <h2 className="text-3xl mb-10">{data === "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <div className="bg-gray-800 w-full h-[1px]"></div>
        <div className="mt-10">
          <button onClick={userLogOut} className="bg-slate-200 hover:scale-95 active:bg-slate-300 rounded-full px-5 py-1 text-black font-semibold">Logout</button>
          <button onClick={getUserDetails} className="bg-slate-200 hover:scale-95 active:bg-slate-300 rounded-full px-5 py-1 text-black font-semibold">get Data</button>
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;
