import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, IconButton, Input, Typography, Textarea, Avatar } from '@material-tailwind/react';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegComment } from 'react-icons/fa';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatar, setAvatar] = useState(null);  // User's profile picture URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/getForumPosts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleImageUpload = async (event) => {
    const files = event.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      try {
        const res = await axios.post('/api/upload', data);
        setSelectedImage(res.data.links[0]); // Store the uploaded image URL
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const handleCreatePost = async () => {
    try {
      const newPost = {
        title,
        body: content,
        uploadPic: selectedImage ? [selectedImage] : [],  // Attach the image URL
        avatar,  // Add avatar if available
        dateCreated: new Date(),
      };
      const response = await axios.post('/api/createForumPost', newPost);
      setPosts([response.data, ...posts]);
      setTitle("");
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.patch(`/api/likePost/${postId}`);
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: response.data.likes } : post));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-1/5 p-4 bg-white shadow-md">
        <Typography variant="h6" className="mb-4">Forum Categories</Typography>
        <ul className="space-y-2">
          <li><Button variant="text" color="blue-gray">General</Button></li>
          <li><Button variant="text" color="blue-gray">News</Button></li>
          <li><Button variant="text" color="blue-gray">Technology</Button></li>
          <li><Button variant="text" color="blue-gray">Entertainment</Button></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <Typography variant="h4" className="mb-6">Forum Posts</Typography>

        <Card className="p-4 mb-6">
          <Typography variant="h5" className="mb-4">Create a Post</Typography>
          <Input label="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Post Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <input type="file" onChange={handleImageUpload} className="mt-2" />
          <Button onClick={handleCreatePost} color="blue-gray" className="mt-4">Submit</Button>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-row items-start p-4">
              <Avatar src={post.avatar} alt="Profile" size="lg" className="mr-4" />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold mb-2">{post.title}</Typography>
                <Typography className="text-gray-700 mb-4">{post.body}</Typography>
                {post.uploadPic && post.uploadPic.length > 0 && (
                  <img src={post.uploadPic[0]} alt="Post" className="mb-4 w-full h-64 object-cover rounded-lg" />
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <IconButton color="red" variant="text" onClick={() => handleLikePost(post._id)}>
                    <FaHeart />
                  </IconButton>
                  <Typography variant="h6" className="mr-4">{post.likes || 0}</Typography>
                  <Button variant="text" color="blue-gray" className="flex items-center space-x-1">
                    <FaRegComment />
                    <span>Comments</span>
                  </Button>
                  <span>{formatDistanceToNow(new Date(post.dateCreated))} ago</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
