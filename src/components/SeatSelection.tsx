import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';
import { Movie, Theater, Seat } from '../types';
import { generateSeats } from '../data/seats';

interface SeatSelectionProps {
  movie: Movie;
  theater: Theater;
  showtime: string;
  onSelectSeats: (seats: Seat[]) => void;
  onBack: () => void;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  movie,
  theater,
  showtime,
  onSelectSeats,
  onBack
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatId 
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  useEffect(() => {
    const selected = seats.filter(seat => seat.isSelected);
    setSelectedSeats(selected);
  }, [seats]);

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-600 cursor-not-allowed opacity-50';
    if (seat.isSelected) return 'bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-300 ring-2 ring-red-400 shadow-lg';
    if (seat.type === 'vip') return 'bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 border border-yellow-400';
    if (seat.type === 'premium') return 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-400';
    return 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 border border-gray-400';
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Theaters</span>
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 border border-gray-700 shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Select Your Seats</h2>
              <p className="text-gray-400 mb-8">Click on seats to select them for this show</p>

              {/* Screen */}
              <div className="text-center mb-12">
                <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-4 shadow-lg"></div>
                <span className="text-sm font-bold text-gray-300 tracking-widest">SCREEN</span>
              </div>

              {/* Seats Grid */}
              <div className="space-y-4 max-w-2xl mx-auto mb-12">
                {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                  <div key={row} className="flex items-center justify-center space-x-2">
                    <span className="text-sm font-bold w-6 text-right text-gray-400">{row}</span>
                    <div className="flex space-x-2">
                      {rowSeats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
                          disabled={!seat.isAvailable}
                          className={`w-9 h-9 rounded-md font-bold transition-all duration-200 transform hover:scale-110 ${getSeatColor(seat)}`}
                          title={`${seat.row}${seat.number} - ${seat.type} - $${seat.price}`}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                    <span className="text-sm font-bold w-6 text-left text-gray-400">{row}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-700 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-gray-500 to-gray-600 rounded border border-gray-400"></div>
                  <span className="text-sm text-gray-300">Regular ($12)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded border border-blue-400"></div>
                  <span className="text-sm text-gray-300">Premium ($18)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded border border-yellow-400"></div>
                  <span className="text-sm text-gray-300">VIP ($25)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-600 rounded opacity-50"></div>
                  <span className="text-sm text-gray-300">Occupied</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-6 border border-gray-700 sticky top-8 shadow-xl">
              <div className="flex items-center space-x-2 mb-6 pb-6 border-b border-gray-700">
                <CheckCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold">Booking Summary</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-gray-400 text-sm">Movie</span>
                  <p className="font-semibold text-white line-clamp-2">{movie.title}</p>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <span className="text-gray-400 text-sm">Theater</span>
                  <p className="font-semibold text-white">{theater.name}</p>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <span className="text-gray-400 text-sm">Showtime</span>
                  <p className="font-semibold text-white">{showtime}</p>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <span className="text-gray-400 text-sm">Seats Selected</span>
                  <p className="font-semibold text-white mt-1">
                    {selectedSeats.length > 0 
                      ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedSeats.map(seat => (
                            <span key={seat.id} className="px-2 py-1 bg-red-600/30 text-red-300 rounded text-xs">
                              {seat.row}{seat.number}
                            </span>
                          ))}
                        </div>
                      )
                      : <span className="text-gray-500">None selected</span>
                    }
                  </p>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="space-y-3 mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 font-semibold mb-3">Price Breakdown</p>
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">{seat.row}{seat.number} ({seat.type})</span>
                      <span className="text-red-400 font-semibold">${seat.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-red-500">${totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => onSelectSeats(selectedSeats)}
                disabled={selectedSeats.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 transform ${
                  selectedSeats.length > 0
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 active:scale-95 shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSeats.length > 0 ? `Continue (${selectedSeats.length})` : 'Select Seats'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};