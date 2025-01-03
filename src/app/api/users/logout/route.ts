/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
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
    NextResponse.json({error:error.message, status:500})
  }
}