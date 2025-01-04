/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    if (!token) {
      return NextResponse.json({ error: "Token not found", status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpirey: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Token Invalid or Experied", status: 500 });
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpirey = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 501 });
  }
}
