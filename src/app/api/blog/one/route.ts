import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { slicedId } = reqBody;
    
    const blog = await Blog.findOne({_id: slicedId}).populate("author");

    return NextResponse.json({
      message: "Blog data fetched",
      success: true,
      blog,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
