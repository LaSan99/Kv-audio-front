import { Link } from 'react-router-dom';

export default function ErrorNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="text-center animate-fade-in">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-purple-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-12 animate-bounce">
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
    </div>
  );
}