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
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/getForumPosts`);
      console.log(response.data); 
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    fetchPosts();
  }, []);

//Media Upload
async function uploadForumMedia(ev){
  const files = ev.target?.files;
  if (files?.length > 0) {
    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
    
    if (!allowedTypes.includes(file.type)) {
      setImageError("Invalid file type. Please upload an image or video.");
      return;
    }

    // Check file size (12MB limit)
    const maxSize = 12 * 1024 * 1024; // 12MB in bytes
    if (file.size > maxSize) {
      setImageError("File size exceeds 12MB. Please upload a smaller file.");
      return;
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
          toast.error("Failed to upload media.");

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
      console.log(response.data);
      setPosts([response.data.post, ...posts]);
      setTitle("");
      setContent("");
      setForumImages([]);// Clear uploaded images after submission
      fetchPosts();
      
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLikePost = async (postId, userId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/likePost/${postId}`,
        { userId }  // Send the userId in the request body
      );
      console.log(response.data);
      // Update the posts state with the new like count
      setPosts(posts.map(post =>
        post._id === postId
          ? { ...post, likes: response.data.likes } 
          : post
      ));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleInputChange = (postId, value) => {
    setComment((prevComments) => ({
      ...prevComments,
      [postId]: value, // Update the comment for this specific post
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = comment[postId];
    if (commentText.trim()) {
      try {
        await handleAddComment(postId, commentText);  // Add the comment
        setComment((prevComments) => ({
          ...prevComments,
          [postId]: "",  // Reset the specific post's comment input
        }));
      } catch (error) {
        console.error("Failed to add comment:", error);
        toast.error("Failed to add comment. Please try again.");
      }
    } else {
      toast.error("Comment cannot be empty.");
    }
  };
  
  const handleAddComment = async (postId, commentText) => {
    try {
      // Extract token and decode userId
      const token = localStorage.getItem('token');

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

      fetchPosts();
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


  /*useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);*/

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <main className="flex-1 px-4 sm:px-6 md:px-60 mb-20 mt-10">
        {/* Forum Posts */}
        <Typography variant="h4" className="mb-6">Forum Posts</Typography>

        <Card className="p-4 mb-6">
          <Typography variant="h5" className="mb-4">Create a Post</Typography>
          <div className='space-y-4'>
            <Input 
              label="Post Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              />
            <div className="relative">
              <Textarea 
                label="Post Content" 
                value={content} 
                onChange={handleContentChange} 
                maxLength={MAX_CONTENT_LENGTH} // Enforce character limit
                helpertext={`${content.length}/${MAX_CONTENT_LENGTH} characters`}
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
                Upload Media
            </Typography>
            {/* File Upload */}
            <input
                type="file" 
                onChange={uploadForumMedia}
                accept="image/*,video/*"  
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
                  {forumImages.map((media, index) => (
                    <div key={index} className="h-full w-full flex justify-center items-center">
                      {media.endsWith('.mp4') || media.endsWith('.mov') || media.endsWith('.avi') ? (
                        <video controls className="h-full w-full object-contain">
                          <source src={media} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={media}
                          alt={`Uploaded media ${index + 1}`}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>
                  ))}         
                </Carousel>
              ) : (
                <Typography className="mt-4 text-gray-500 text-center">
                  No media uploaded yet.
                </Typography>
              )}
          </div>

          <Button onClick={handleCreatePost} className="mt-4 bg-primary hover:opacity-80">Submit</Button>
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
            <Card key={post._id} className="p-4">
              <div className="flex items-start mb-4">
                <Avatar src={post.userId?.avatar || "/GUEST-PROFILE.png"} alt="Profile" size="lg" className="mr-4" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Typography variant="h6" className="font-normal">
                      {post.userId?.firstName || "Anonymous"}
                    </Typography>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(post.dateCreated))} ago
                    </span>
                  </div>
                  <Typography variant="h6" className="font-bold">{post.title}</Typography>
                </div>
              </div>

              {/* Post Body */}
              <div className="w-full">
                <Typography className="text-gray-700 mb-4 text-justify">{post.body}</Typography>
                <div className="mb-4 border rounded-xl">
                  {/* Uploaded Images Carousel */}
                  {post.uploadPic && post.uploadPic.length > 0 && (
                    <Carousel className="rounded-xl h-64 lg:h-[780px]">
                    {post.uploadPic.map((media, index) => (
                      <div key={index} className="h-full w-full flex justify-center items-center">
                        {/* Check if the media is a video or image */}
                        {media.endsWith('.mp4') || media.endsWith('.mov') || media.endsWith('.avi') ? (
                          <video controls className="h-full w-full object-contain">
                            <source src={media} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={media}
                            alt={`Uploaded media ${index + 1}`}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </Carousel>
                  )}
                </div>

                {/* Like and Comment Buttons */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <IconButton color="red" variant="text" onClick={() => handleLikePost(post._id)}>
                    <FaHeart />
                  </IconButton>
                  <Typography variant="h6" className="mr-4">{post.likes.length || 0}</Typography>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {/* Input Field */}
                  <input
                    type="text"
                    value={comment[post._id] || ""}
                    onChange={(e) => handleInputChange(post._id, e.target.value)}
                    placeholder="Add a comment..."
                    className="border p-2 rounded-md w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent default Enter behavior (e.g., new line).
                        handleCommentSubmit(post._id);
                      }
                    }}
                  />

                  {/* Submit Button */}
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>

                {/* Show Comments */}
                <div className="mt-4">
                  {post.comments.slice(0, expandedPosts.includes(post._id) ? post.comments.length : 4).map((comment, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Avatar src={comment.userId?.avatar} alt="Profile" size="sm" />
                      <div>
                        <Typography className="font-semibold text-sm">
                          {comment.userId?.firstName || "Anonymous"}
                        </Typography>
                        <Typography className="font-light text-sm">{comment.comment}</Typography>
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
                      {expandedPosts.includes(post._id) ? "Hide Comments" : `View More ${post.comments.length - 4} Comments`}
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