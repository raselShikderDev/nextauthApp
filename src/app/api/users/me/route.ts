/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDatafromToken from "@/helpers/getDatafromToken";
import { error } from "console";

connect();

export async function POST(request: NextRequest) {
  // Extract data from Token
  const userId = await getDatafromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    NextResponse.json({error:"User not Found", status:500})
  }
  NextResponse.json({
    message: "User found",
    success: true,
    data: user,
    status:200,
  })
}
