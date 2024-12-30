import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import {sendEmail} from "@/helpers/mailer"
connect()

export async function POST(request:NextRequest) {
  try {
    const resBody = await request.json();
    const { username, email, password } = resBody;
    console.log(`Line no. api/signup/api/Line-12:- username: ${username}, email: ${email}, password: ${password}`);
    
    // validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user alredy exists" },
        { status: 400 }
      );
    }
    // converting password into Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating New User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveduser = await newUser.save();
    console.log(saveduser);
    console.log("Saved user object:", saveduser);
console.log("Extracted userId for email:", saveduser._id);


    // Send verification Email
    await sendEmail({ email, emailType: "VERIFY", userId: saveduser._id.toString() });
        console.log(`Line no. api/signup/api/Line-37:- userId: ${saveduser._id.toString()}`);

    return NextResponse.json({
      message: "User registred successfully",
      success: true,
      saveduser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}