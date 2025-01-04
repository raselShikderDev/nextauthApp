/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import getDatafromToken from "@/helpers/getDatafromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Extract data from Token
  const userId = await getDatafromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    return NextResponse.json({error:"User not Found", status:500})
  }
  return NextResponse.json({
    message: "User found",
    success: true,
    data: user,
    status:200,
  })
  } catch (error:any) {
    return NextResponse.json({error:error.message, status:500})
  }
}
