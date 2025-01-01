/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      NextResponse.json({ error: "User doesn't exists", status: 501 });
    }
    const passwordValidity = await bcrypt.compare(password, user.password);
    if (!passwordValidity) {
      NextResponse.json({ error: "Wrong Credentials", status: 502 });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Successfully loggedIn",
      sucess: true,
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
    
  } catch (error: any) {
    NextResponse.json({ error: error.messabe, status: 500 });
  }
}
