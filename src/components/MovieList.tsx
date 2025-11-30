import React from 'react';
import { Film, Search } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 backdrop-blur-sm border-b border-red-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <Film className="w-10 h-10 text-red-500 mr-3" />
                <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 bg-clip-text text-transparent">
                  CineBook
                </h1>
                <p className="text-gray-400 text-xs">Your Ultimate Movie Booking Platform</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Search movies">
              <Search className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Now <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Showing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and book your favorite movies with seamless checkout. Enjoy premium seating and exclusive offers.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-colors">
              All Movies
            </button>
            <button className="px-6 py-2 border border-gray-600 hover:border-red-500 rounded-full font-semibold transition-colors">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-12 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm">Your trusted partner for all movie booking needs.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4 text-gray-400">
                <a href="#" className="hover:text-red-500 transition-colors">Facebook</a>
                <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 CineBook. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};