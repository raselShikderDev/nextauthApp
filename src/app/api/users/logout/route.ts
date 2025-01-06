/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {

    const response = NextResponse.json({
      message: "Successfully logOut",
      success: true,
      status:200,
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: Date.now()
    })

    return response
  
  } catch (error:any) {
    return NextResponse.json({error:error.message, status:500})
  }
}