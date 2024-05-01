"use client";
import axios from "axios";
import React, { useState } from "react";

interface Comment {
  _id: string;
  text: string;
  author: any;
  replies?: Comment[] | any; // comments can have replies
}

// interface Blog {
//   title: string;
//   category: string;
//   content: string;
//   author: {
//     username: string;
//     email: string;
//   };
//   comments: Comment[];
//   createdAt: Date;
// }

function Comment({ comment }: { comment: Comment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [text, setText] = useState("");

  const handleNewReply = async (parentCommentId: string, text: string) => {
    try {
      // Replace with your actual API call or data manipulation logic
      const response = await axios.post("/api/blog/comment", {
        parentCommentId,
        text,
      });

      // Handle successful response (e.g., clear the input field, update UI)
      console.log("Reply posted successfully:", response.data);
      setText(""); // Assuming setNewReply is a state setter (if needed)
    } catch (error: any) {
      console.error("Error posting reply:", error.message);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div className="comment" key={comment._id}>
      {comment.text} <span onClick={handleReplyClick}>reply</span>
      {showReplyInput && (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => handleNewReply(comment._id, text)}>
            Comment
          </button>
        </>
      )}
      {/* Recursive rendering for replies */}
      {comment.replies && (
        <div className="replies">
          {comment.replies.map((reply: Comment) => (
            <Comment key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogComments({
  comments,
  blogId,
}: {
  comments: Comment["replies"];
  blogId: string;
}) {
  const [text, setText] = useState("");
  const handleNewComment = async (blogId: string, text: string) => {
    try {
      // Replace with your actual API call or data manipulation logic
      const response = await axios.post("/api/blog/comment", {
        blogId,
        text,
      });

      // Handle successful response (e.g., clear the input field, update UI)
      console.log("Comment posted successfully:", response.data);
      setText(""); // Assuming setNewReply is a state setter (if needed)
    } catch (error: any) {
      console.error("Error posting reply:", error.message);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="comments">
      {comments.map((comment: Comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleNewComment(blogId, text)}>Comment</button>
    </div>
  );
}

export default BlogComments;
