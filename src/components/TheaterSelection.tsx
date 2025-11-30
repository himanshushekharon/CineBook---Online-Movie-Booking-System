import React, { useState } from 'react';
import { MapPin, ArrowLeft, Clock, Users, Film } from 'lucide-react';
import { Movie, Theater } from '../types';
import { theaters } from '../data/theaters';

interface TheaterSelectionProps {
  movie: Movie;
  onSelectTheater: (theater: Theater, showtime: string) => void;
  onBack: () => void;
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

export const TheaterSelection: React.FC<TheaterSelectionProps> = ({
  movie,
  onSelectTheater,
  onBack
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const gradientClass = getGradientColors(movie.title);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Movies</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Movie Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700">
                {!imageError ? (
                  <>
                    {!imageLoaded && (
                      <div className={`w-full h-64 bg-gradient-to-br ${gradientClass} animate-pulse`} />
                    )}
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      onError={() => setImageError(true)}
                      onLoad={() => setImageLoaded(true)}
                      className="w-full h-64 object-cover"
                    />
                  </>
                ) : (
                  <div className={`w-full h-64 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                    <div className="text-center">
                      <Film className="w-12 h-12 text-white/30 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Image unavailable</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 line-clamp-2">{movie.title}</h2>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{movie.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-red-500" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genre.map((g, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Theater Selection */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Select Theater & Showtime</h1>
              <p className="text-gray-400">Choose your preferred theater and show timing</p>
            </div>
            
            <div className="grid gap-6">
              {theaters.map((theater, idx) => (
                <div key={theater.id} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{theater.name}</h3>
                          <p className="text-gray-400 text-sm">{theater.distance} away</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 mt-2 ml-13">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{theater.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {movie.showtimes.map((showtime) => (
                      <button
                        key={showtime}
                        onClick={() => onSelectTheater(theater, showtime)}
                        className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm border border-gray-600 hover:border-red-500 transform hover:scale-105 active:scale-95 shadow-md"
                      >
                        {showtime}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};