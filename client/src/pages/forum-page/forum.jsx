import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, IconButton, Input, Typography, Textarea, Avatar, Spinner } from '@material-tailwind/react';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { FiUpload } from "react-icons/fi";
import { baseUrl } from '@/Url';
import { Carousel } from "@material-tailwind/react";
import toast from 'react-hot-toast';


export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState('');
  const [forumImages, setForumImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [expandedPosts, setExpandedPosts] = useState([]); // Tracks which posts have expanded comments
  
  const MAX_CONTENT_LENGTH = 280;

  useEffect(() => {
    // Check if there's a valid JWT token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/getForumPosts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  
  const handleCommentSubmit = (postId) => {
    if (comment.trim()) {
      handleAddComment(postId, comment);
      setComment(''); // Reset the input after comment is added
    }
  };

//Sortable image upload
async function uploadForumImages(ev){
  const files = ev.target?.files;
  if (files?.length > 0) {
    const file = files[0];
    if (file.size > 12 * 1024 * 1024) { // 12MB limit
      setImageError("File size exceeds the 12MB limit.");
      return;
    } else {
      setImageError(""); // Clear error message if file size is acceptable
    }

      setIsUploading(true);
      const data = new FormData();
      data.append('file', file);

      try {
          const res = await axios.post('/api/upload', data);
          console.log("Upload response:", res);
          setForumImages(oldImages => {
              return [...oldImages, ...res.data.links];
          });
      } catch (error) {
          toast.error("Failed to upload image.");

      } finally {
          setIsUploading(false);
      }
  }
}
// Function to limit content input to 280 characters
const handleContentChange = (e) => {
  const newContent = e.target.value;
  if (newContent.length <= MAX_CONTENT_LENGTH) {
    setContent(newContent);
  }
};

  const handleCreatePost = async () => {
    if (!isAuthenticated) {
      setErrorMessage("You must be logged in to create a post");
      return;
    }

    try {
      const newPost = {
        title,
        body: content,
        uploadPic: forumImages,
        dateCreated: new Date(),
      };
      const response = await axios.post(`${baseUrl}/api/createForumPost`, newPost);
      setPosts([response.data, ...posts]);
      setTitle("");
      setContent("");
      setForumImages([]);// Clear uploaded images after submission
      
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/likePost/${postId}`);
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: response.data.likes } : post));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      // Extract token and decode userId
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (!token) {
        console.error("Token is missing.");
        toast.error("You must be logged in to comment.");
        return;
      }
  
      // Decode the token to get userId
      const { id: userId } = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded userId:", userId);
  
      if (!commentText.trim()) {
        toast.error("Comment cannot be empty.");
        return;
      }
  
      // Make API request
      const response = await axios.post(`${baseUrl}/api/commentPost/${postId}`, {
        userId, // Pass userId correctly
        comment: commentText,
      });
  
      // Update posts state with new comments
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, comments: response.data.comments } : post
      ));
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };
  const toggleExpandComments = (postId) => {
    setExpandedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
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
        {/* Forum Posts */}
        <Typography variant="h4" className="mb-6">Forum Posts</Typography>

        <Card className="p-4 mb-6">
          <Typography variant="h5" className="mb-4">Create a Post</Typography>
          <div className='space-y-4'>
            <Input 
              label="Post Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} required 
              />
            <div className="relative">
              <Textarea 
                label="Post Content" 
                value={content} 
                onChange={handleContentChange} 
                required 
                maxLength={MAX_CONTENT_LENGTH} // Enforce character limit
                helperText={`${content.length}/${MAX_CONTENT_LENGTH} characters`}
                className="w-full"
              />
              <div className="absolute top-0 right-0 text-sm text-gray-500 mt-2 mr-2">
                {content.length}/{MAX_CONTENT_LENGTH}
              </div>
            </div>
          </div>
          
          
          {/* Upload Photo */}
          <div>
            <Typography variant="h4" className="my-2">
                Upload Photo
            </Typography>
            {/* File Upload */}
            <input
                type="file" 
                onChange={uploadForumImages}
                accept="image/*"  
                id="file-upload"
                className="hidden " // Hide the actual file input
            />
            <label htmlFor="file-upload" className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer">
                <FiUpload className='w-5 h-5 mr-4' />
                <span>{isUploading ? <Spinner size="sm" /> : "Upload Images"}</span>
            </label>

            {/* Error Message Below Upload */}
            {imageError && (
              <Typography variant="body2" color="red" className="mt-2">
                {imageError}
              </Typography>
            )}

            {/* Carousel */}
              {forumImages.length > 0 ? (
                <Carousel className="mt-4 rounded-xl h-64 overflow-hidden">
                  {forumImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Uploaded image ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  ))}
                </Carousel>
              ) : (
                <Typography className="mt-4 text-gray-500 text-center">
                  No images uploaded yet.
                </Typography>
              )}
          </div>

          <Button onClick={handleCreatePost} color="blue-gray" className="mt-4">Submit</Button>
          {/* Error Message */}
          {errorMessage && (
            <Typography variant="body2" color="red" className="mt-2">
              {errorMessage}
            </Typography>
          )}
        </Card>

        {/* Forum See All Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-row items-start p-4">
              <Avatar src={post.userId?.avatar} alt="Profile" size="lg" className="mr-4" />
              <div className="flex-1">
                <div className='flex justify-between'>
                  <Typography variant='h6' className='font-extralight'>{post.userId?.firstName || 'Anonymous'}</Typography>
                  <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(post.dateCreated))} ago</span>
                </div>
                <Typography variant="h6" className="font-bold mb-2">{post.title}</Typography>
                <Typography className="text-gray-700 mb-4 text-justify">{post.body}</Typography>
                {/* Uploaded Images Carousel */}
                {post.uploadPic && post.uploadPic.length > 0 && (
                  <Carousel className="mt-4 rounded-xl h-64">
                    {post.uploadPic.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ))}
                  </Carousel>
                )}
                
                {/* Like and Comment Buttons */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <IconButton color="red" variant="text" onClick={() => handleLikePost(post._id)}>
                    <FaHeart />
                  </IconButton>
                  <Typography variant="h6" className="mr-4">{post.likes || 0}</Typography>
                </div>

                {/* Comment Section */}
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="border p-2 rounded-md w-full mt-2"
                  //onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post._id)}
                />
                <Button onClick={() => handleCommentSubmit(post._id)} color="blue">Submit</Button>
                
                {/* Show Comments */}
                <div className="mt-4">
                  {post.comments.slice(0, expandedPosts.includes(post._id) ? post.comments.length : 4).map((comment, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Avatar src={comment.userId?.avatar} alt="Profile" size="sm" />
                      <div>
                        <Typography variant="body2" className="font-bold">{comment.userId?.firstName || 'Anonymous'}</Typography>
                        <Typography variant="body2">{comment.comment}</Typography>
                      </div>
                    </div>
                  ))}
                  {post.comments.length > 4 && (
                    <Button
                      variant="text"
                      color="blue-gray"
                      onClick={() => toggleExpandComments(post._id)}
                      className="text-sm"
                    >
                      {expandedPosts.includes(post._id) ? 'Hide Comments' : `View More ${post.comments.length - 4} Comments `}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}