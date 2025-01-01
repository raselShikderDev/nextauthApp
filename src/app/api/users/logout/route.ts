/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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