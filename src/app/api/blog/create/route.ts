import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, category, content } = reqBody;

    // Assuming you have a function to get user ID from the token
    const userId = getDataFromToken(request);

    const newBlog = new Blog({
      title,
      category,
      content,
      author: userId,
    });

    const savedBlog = await newBlog.save();

    // Append the saved blog's ID to the user's blogs array
    await User.findOneAndUpdate(
      {_id: userId},
      { $push: { blogs: savedBlog._id } },
      { new: true }
    );

    return NextResponse.json({
      message: "Blog created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
