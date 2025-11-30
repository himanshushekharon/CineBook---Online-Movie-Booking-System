export interface Movie {
  id: string;
  title: string;
  poster: string;
  description: string;
  duration: number;
  rating: string;
  genre: string[];
  showtimes: string[];
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  type: 'regular' | 'premium' | 'vip';
  price: number;
}

export interface BookingDetails {
  movie: Movie;
  theater: Theater;
  showtime: string;
  seats: Seat[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
}