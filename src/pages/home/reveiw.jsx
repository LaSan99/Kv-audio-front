import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Check if user is logged in
    if (!token) {
      toast.error("Please login first");
      return;
    }

    // Validate rating and comment
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter a valid comment");
      return;
    }

    try {
      const reviewData = {
        rating: Number(rating),
        comment: comment.trim(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Review submitted successfully!");

      // Reset form after submission
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      if (err.response?.status === 400) {
        toast.error(
          err.response.data.message ||
            "Invalid input. Please check your review."
        );
      } else if (err.response?.status === 401) {
        toast.error("Please login again");
      } else {
        toast.error("Failed to submit review. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-accent text-center mb-8">
        Leave a Review
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-4">
          <label className="mb-3 text-lg font-medium text-gray-700">
            Rating:
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className="hidden"
                />
                <FaStar
                  className="transition-colors duration-200"
                  size={30}
                  color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
            rows="4"
            placeholder="Share your thoughts..."
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-yellow text-black px-8 py-3 rounded-md hover:bg-accent/90 transition duration-200 font-medium"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;
