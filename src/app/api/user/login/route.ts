import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = "blogwebsite";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("user exists");

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

    // create response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      id: user._id
    });

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // return the response
    return response;
  } catch (error: any) {
    // handle errors
    console.error("Error in login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
