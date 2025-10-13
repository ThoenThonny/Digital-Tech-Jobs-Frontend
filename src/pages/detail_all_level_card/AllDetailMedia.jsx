// src/pages/MediaDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mediaData } from "./Meadia";

export default function AllDetailMedia() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const media = mediaData.find(item => item.id === Number(id));

  if (!media) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Media not found.
      </div>
    );
  }

  return (
    <div>
           <div className="w-[100%] h-[200px] bg-blue-50">

                </div>

    <div className="max-w-5xl mx-auto p-6">
     

      {/* Title */}
      <h1 className="text-4xl font-bold mb-3">{media.title}</h1>
      
      {/* Date, Category, Location */}
      <p className="text-gray-500 mb-5">
        {media.date} | {media.category} | {media.location}
      </p>

      {/* Main Image */}
      <img 
        src={media.image} 
        alt={media.title} 
        className="w-full h-[500px] object-cover mb-6 rounded-lg shadow-lg" 
      />

      {/* Content */}
      <p className="mb-5 text-lg leading-relaxed">{media.content}</p>

      {/* Tags, Views, Likes, Author */}
      <div className="flex flex-wrap gap-3 mb-5">
        {media.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-500 mb-6">
        Views: {media.views} | Likes: {media.likes} | Author: {media.author}
      </p>

      {/* Comments */}
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-4">
        {media.comments.map((c, idx) => (
          <li 
            key={idx} 
            className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200 w-full"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{c.user}</span>
              <span className="text-gray-400 text-sm">{c.date}</span>
            </div>
            <p className="text-gray-700">{c.comment}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
