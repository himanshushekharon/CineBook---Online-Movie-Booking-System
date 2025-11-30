import React from 'react';
import { CheckCircle, Calendar, MapPin, Users, Download, Ticket, Share2, Copy } from 'lucide-react';
import { BookingDetails } from '../types';

interface BookingConfirmationProps {
  booking: BookingDetails;
  onNewBooking: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onNewBooking
}) => {
  const bookingId = `BK${Date.now().toString().slice(-8)}`;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-t-lg p-8 border border-gray-700 border-b-0 text-center shadow-xl">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
              <CheckCircle className="w-20 h-20 text-green-500 relative" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-300 mb-2">
              Your movie tickets have been successfully reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Confirmation email sent to <span className="text-red-400 font-semibold">{booking.customerInfo.email}</span>
            </p>
          </div>

          {/* Booking ID */}
          <div className="bg-gradient-to-r from-red-600/30 to-red-700/20 border-l-4 border-red-500 p-6 mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">BOOKING ID</p>
                <p className="text-2xl font-bold font-mono">{bookingId}</p>
              </div>
              <button
                onClick={handleCopy}
                title="Copy booking ID"
                className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Copy className={`w-5 h-5 ${copied ? 'text-green-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>

          {/* Main Confirmation Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-b-lg border border-gray-700 border-t-0 shadow-xl">
            {/* Movie Details */}
            <div className="p-8 border-b border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-red-500" />
                <span>Booking Details</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Movie Info */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">MOVIE</p>
                  <p className="text-2xl font-bold mb-2">{booking.movie.title}</p>
                  <p className="text-gray-400 text-sm">{booking.movie.rating} • {booking.movie.duration} min</p>
                </div>

                {/* Theater Info */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">THEATER</p>
                  <p className="text-2xl font-bold mb-2">{booking.theater.name}</p>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.theater.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Details Grid */}
            <div className="grid md:grid-cols-3 gap-4 p-8 border-b border-gray-700">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <p className="text-gray-400 text-sm font-semibold">SHOWTIME</p>
                </div>
                <p className="text-xl font-bold">{booking.showtime}</p>
                <p className="text-gray-500 text-xs mt-1">Today</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <p className="text-gray-400 text-sm font-semibold">SEATS</p>
                </div>
                <p className="text-xl font-bold">{booking.seats.length} {booking.seats.length === 1 ? 'Seat' : 'Seats'}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {booking.seats.map(s => `${s.row}${s.number}`).join(', ')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-600/30 to-red-700/20 rounded-lg p-6 border border-red-500/30">
                <p className="text-gray-400 text-sm font-semibold mb-2">TOTAL PAID</p>
                <p className="text-2xl font-bold text-red-400">${booking.totalPrice}</p>
                <p className="text-gray-500 text-xs mt-1">Confirmed payment</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-8 border-b border-gray-700">
              <h3 className="font-bold mb-4 text-gray-300">Price Breakdown</h3>
              <div className="space-y-2">
                {booking.seats.map((seat) => (
                  <div key={seat.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{seat.row}{seat.number} ({seat.type})</span>
                    <span className="font-semibold">${seat.price}</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-lg mt-3">
                  <span>Total</span>
                  <span className="text-red-400">${booking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-8 bg-blue-900/20 border-t border-gray-700">
              <div className="flex items-start space-x-4 mb-6">
                <div className="text-blue-400 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 000 2h6a1 1 0 000-2H8zm1 5a1 1 0 11-2 0 1 1 0 012 0zm5-1a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-blue-200 mb-2">Important Reminders</p>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• Arrive 15 minutes before showtime</li>
                    <li>• Show this confirmation or download tickets at entrance</li>
                    <li>• Keep your booking ID for reference</li>
                    <li>• Contact support for any changes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 space-y-3">
              <button
                title="Download your tickets"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Tickets (PDF)</span>
              </button>
              
              <button
                title="Share booking details"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Booking</span>
              </button>
              
              <button
                onClick={onNewBooking}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Book Another Movie
              </button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Need help? <a href="#" className="text-red-500 hover:text-red-400 font-semibold transition-colors">Contact Support</a> or call +1-800-CINEMA</p>
          </div>
        </div>
      </div>
    </div>
  );
};