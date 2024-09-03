import React from "react";

const PostItem = ({ post, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onEdit(post)}>Edit</button>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
};

export default PostItem;
