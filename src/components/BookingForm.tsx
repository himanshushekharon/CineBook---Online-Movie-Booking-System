import React, { useState } from 'react';
import { ArrowLeft, CreditCard, User, Mail, Phone, Lock, AlertCircle, Film } from 'lucide-react';
import { Movie, Theater, Seat, BookingDetails } from '../types';

interface BookingFormProps {
  movie: Movie;
  theater: Theater;
  showtime: string;
  seats: Seat[];
  onConfirmBooking: (booking: BookingDetails) => void;
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

export const BookingForm: React.FC<BookingFormProps> = ({
  movie,
  theater,
  showtime,
  seats,
  onConfirmBooking,
  onBack
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const gradientClass = getGradientColors(movie.title);

  const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const booking: BookingDetails = {
      movie,
      theater,
      showtime,
      seats,
      customerInfo,
      totalPrice
    };

    onConfirmBooking(booking);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Seat Selection</span>
        </button>

        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-gray-400">Provide your details and confirm payment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 border border-gray-700 shadow-xl mb-8">
                <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-700">
                  <User className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="border-t border-gray-700 pt-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <CreditCard className="w-5 h-5 text-red-500" />
                      <h3 className="text-lg font-bold">Payment Method</h3>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                        <input type="radio" name="payment" defaultChecked className="w-4 h-4" title="Credit/Debit Card Payment" />
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-3">
                        <Lock className="w-4 h-4 inline mr-1" />
                        Your payment is secure and encrypted
                      </p>
                    </div>
                  </div>

                  {/* Alert */}
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-200">This is a demo booking system. No actual payment will be charged.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 transform ${
                      isProcessing || !customerInfo.name || !customerInfo.email || !customerInfo.phone
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 active:scale-95 shadow-lg'
                    }`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      `Pay $${totalPrice} Now`
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-6 border border-gray-700 sticky top-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6 pb-6 border-b border-gray-700">Order Summary</h3>
                
                <div className="space-y-6">
                  {/* Movie */}
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      {!imageError ? (
                        <>
                          {!imageLoaded && (
                            <div className={`w-16 h-24 bg-gradient-to-br ${gradientClass} rounded-lg animate-pulse`} />
                          )}
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            onError={() => setImageError(true)}
                            onLoad={() => setImageLoaded(true)}
                            className="w-16 h-24 object-cover rounded-lg"
                          />
                        </>
                      ) : (
                        <div className={`w-16 h-24 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                          <Film className="w-5 h-5 text-white/30" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold line-clamp-2">{movie.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{movie.rating} • {movie.duration} min</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="border-t border-gray-700 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Theater</span>
                      <span className="font-semibold">{theater.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Showtime</span>
                      <span className="font-semibold">{showtime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Seats ({seats.length})</span>
                      <span className="font-semibold">{seats.map(seat => `${seat.row}${seat.number}`).join(', ')}</span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-700 pt-4 space-y-2">
                    {seats.map((seat) => (
                      <div key={seat.id} className="flex justify-between text-sm text-gray-300">
                        <span>{seat.row}{seat.number} ({seat.type})</span>
                        <span>${seat.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-red-500">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};