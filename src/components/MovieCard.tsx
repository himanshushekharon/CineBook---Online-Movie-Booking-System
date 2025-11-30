import React, { useState } from 'react';
import { Clock, Star, AlertCircle, Film } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

// Generate a gradient color based on movie title
const getGradientColors = (title: string): string => {
  const colors = [
    'from-purple-600 to-blue-600',
    'from-pink-600 to-red-600',
    'from-orange-600 to-yellow-600',
    'from-green-600 to-blue-600',
    'from-indigo-600 to-purple-600',
    'from-red-600 to-pink-600',
  ];
  const index = title.charCodeAt(0) % colors.length;
  return colors[index];
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const gradientClass = getGradientColors(movie.title);

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-700 hover:border-red-500">
      <div className="relative overflow-hidden h-96">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} animate-pulse`} />
            )}
            <img
              src={movie.poster}
              alt={movie.title}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <div className="text-center">
              <Film className="w-16 h-16 text-white/30 mx-auto mb-3" />
              <p className="text-white/60 text-sm font-semibold">{movie.title}</p>
              <p className="text-white/40 text-xs mt-1">Image unavailable</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {movie.rating}
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span>8.5/10</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{movie.description}</p>
        
        <div className="flex items-center justify-between mb-4 text-gray-300">
          <div className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">{movie.duration} min</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((g, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-900/40 text-red-300 rounded-full text-xs font-medium hover:bg-red-900/60 transition-colors"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onSelect(movie)}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};