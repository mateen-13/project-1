import React, { useState, useEffect } from "react";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/apiService";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleSave = async (post) => {
    if (editingPost) {
      //   const updatedPost = await updatePost(editingPost.id, post);
      const updatedPost = await updatePost(editingPost.id, {
        ...editingPost,
        ...post,
      });

      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setEditingPost(null);
    } else {
      const newPost = await createPost(post);
      setPosts([...posts, newPost]);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div>
      <PostForm postToEdit={editingPost} onSave={handleSave} />
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
