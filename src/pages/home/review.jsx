import axios from "axios";
import React, { useState } from "react";
import { FaStar, FaQuoteLeft, FaInfoCircle } from "react-icons/fa";
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-accent mb-4">Share Your Experience</h1>
          <p className="text-gray-600 text-lg">Your feedback helps us improve our services</p>
        </div>

        {/* Main Review Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Review Guidelines */}
          <div className="bg-gray-50 p-6 border-b">
            <div className="flex items-start space-x-3">
              <FaInfoCircle className="text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Review Guidelines</h3>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Be specific and honest about your experience</li>
                  <li>Keep it professional and constructive</li>
                  <li>Avoid personal information in your review</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Rating Section */}
            <div className="mb-8">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                How would you rate your experience?
              </label>
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer transform hover:scale-110 transition-transform">
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
                      size={40}
                      color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-2">
                {rating ? `You selected ${rating} star${rating !== 1 ? 's' : ''}` : 'Select your rating'}
              </p>
            </div>

            {/* Comment Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-accent mr-3" />
                <label className="block text-xl font-semibold text-gray-800">
                  Tell us more about your experience
                </label>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200 min-h-[150px]"
                placeholder="Share the details of your experience with our audio equipment and services..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Minimum 10 characters required
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow text-black px-10 py-4 rounded-lg hover:bg-accent/90 transition duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Your review will be visible after moderation. Thank you for helping us improve!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
