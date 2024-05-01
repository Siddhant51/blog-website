import Blog from "@/models/blogModel";
// import User from "@/models/userModel";
import Comment from "@/models/commentModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { blogId, text, parentCommentId } = reqBody;

    // Assuming you have a function to get user ID from the token
    const userId = getDataFromToken(request);

    const newComment = new Comment({
      text: text,
      author: userId,
    });

    await newComment.save();

    if (blogId) {
      await Blog.findOneAndUpdate(
        { _id: blogId },
        { $push: { comments: newComment._id } },
        { new: true }
      );
    } else {
      await Comment.findOneAndUpdate(
        { _id: parentCommentId },
        { $push: { replies: newComment._id } },
        { new: true }
      );
    }

    return NextResponse.json({
      message: "Comment Successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
