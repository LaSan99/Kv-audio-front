import React from 'react';
import { FaQuestion, FaReply, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const InquiryCard = ({ inquiry }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-lg shadow-sm p-5 bg-white transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
            <FaQuestion />
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaCalendarAlt className="text-indigo-500" />
              {formatDate(inquiry.date)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ID: #{inquiry.id}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {inquiry.isResolved ? (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center gap-1">
              <FaCheckCircle /> Resolved
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
              <FaTimesCircle /> Pending
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">Your Inquiry</h3>
        <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-100">
          {inquiry.message}
        </p>
      </div>

      {inquiry.response && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <FaReply className="text-indigo-500" /> Response from AudioRent
          </h3>
          <p className="text-gray-700 bg-blue-50 p-3 rounded border border-blue-100">
            {inquiry.response}
          </p>
        </div>
      )}
    </div>
  );
};

export default InquiryCard; 