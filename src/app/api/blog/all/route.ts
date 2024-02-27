import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET() {
  try {
    // Use populate to include author information from the User model
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
