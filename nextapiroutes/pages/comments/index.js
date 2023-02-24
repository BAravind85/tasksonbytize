import { useState } from "react";

function CommentsList() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  };
  const submitComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    fetchComments();
  };
  const deleteComment = async (commentid) => {
    const res = await fetch(`/api/comments/${commentid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    fetchComments();
  };
  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Load Comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <h1>
              {comment.id} {comment.text}
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </h1>
          </div>
        );
      })}
    </>
  );
}
export default CommentsList;
