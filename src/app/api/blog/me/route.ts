import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    // Assuming you have a function to get user ID from the token
    const userId = getDataFromToken(request);

    const user = await User.findOne({_id: userId}).populate("blogs");

    return NextResponse.json({
      message: "User data fetched",
      success: true,
      user
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
