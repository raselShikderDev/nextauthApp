/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  // const router = useRouter()
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token});
      setIsVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data || "Error Occured");
    }
  };

  useEffect(() => {
    setError(false)
    // Next Method
    // const { query } = router
    // const urlToken = query.token

    // Normal Method
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="w-full sm:w-1/2">
        <h2 className="text-3xl text-center text-slate-100">
          Verify Email
        </h2>
        <h2 className="text-xl text-center p-2 bg-orange-500 text-black">
          {token ? `${token}` : "Token does not exists"}
        </h2>
        {
          isVerified && (
            <div className="mt-10 text-center">
              <h2 className="text-lg text-green-500 font-semibold">Successfully verifed Email</h2>
              <Link className="text-center bg-slate-200 hover:scale-95 active:bg-slate-300 rounded-full px-5 py-1 text-black font-semibold" href="/login">LogIn</Link>
            </div>

          )
        }
        {
          error && (
            <div className="mt-10 text-center">
              <h2 className="text-lg text-green-500 font-semibold">Invalid Token or Token doesn&apos;t exists</h2>
              {/* <Link className="text-center bg-slate-200 hover:scale-95 active:bg-slate-300 rounded-full px-5 py-1 text-black font-semibold" href="/login">LogIn</Link> */}
            </div>

          )
        }
      </div>
    </div>
  );
};

export default VerifyEmailPage;
