import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { NextRequest ,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


export async function GET(request: NextRequest) {
  connect();
  try {
    // Use populate to include author information from the User model
    const users = await User.find();
    const blogs = await Blog.find().populate('author');

    return NextResponse.json({
      message: "All blogs fetched",
      success: true,
      blogs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
