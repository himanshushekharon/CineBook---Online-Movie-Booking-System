import { useState } from 'react';
import { Movie, Theater, Seat, BookingDetails } from './types';
import { movies } from './data/movies';
import { MovieList } from './components/MovieList';
import { TheaterSelection } from './components/TheaterSelection';
import { SeatSelection } from './components/SeatSelection';
import { BookingForm } from './components/BookingForm';
import { BookingConfirmation } from './components/BookingConfirmation';

type AppState = 'movies' | 'theaters' | 'seats' | 'booking' | 'confirmation';

interface BookingState {
  movie?: Movie;
  theater?: Theater;
  showtime?: string;
  seats?: Seat[];
  booking?: BookingDetails;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('movies');
  const [bookingState, setBookingState] = useState<BookingState>({});

  const handleSelectMovie = (movie: Movie) => {
    setBookingState({ movie });
    setCurrentState('theaters');
  };

  const handleSelectTheater = (theater: Theater, showtime: string) => {
    setBookingState(prev => ({ ...prev, theater, showtime }));
    setCurrentState('seats');
  };

  const handleSelectSeats = (seats: Seat[]) => {
    setBookingState(prev => ({ ...prev, seats }));
    setCurrentState('booking');
  };

  const handleConfirmBooking = (booking: BookingDetails) => {
    setBookingState(prev => ({ ...prev, booking }));
    setCurrentState('confirmation');
  };

  const handleNewBooking = () => {
    setBookingState({});
    setCurrentState('movies');
  };

  const handleBack = () => {
    switch (currentState) {
      case 'theaters':
        setCurrentState('movies');
        break;
      case 'seats':
        setCurrentState('theaters');
        break;
      case 'booking':
        setCurrentState('seats');
        break;
      default:
        setCurrentState('movies');
    }
  };

  switch (currentState) {
    case 'movies':
      return (
        <MovieList
          movies={movies}
          onSelectMovie={handleSelectMovie}
        />
      );
    case 'theaters':
      return (
        <TheaterSelection
          movie={bookingState.movie!}
          onSelectTheater={handleSelectTheater}
          onBack={handleBack}
        />
      );
    case 'seats':
      return (
        <SeatSelection
          movie={bookingState.movie!}
          theater={bookingState.theater!}
          showtime={bookingState.showtime!}
          onSelectSeats={handleSelectSeats}
          onBack={handleBack}
        />
      );
    case 'booking':
      return (
        <BookingForm
          movie={bookingState.movie!}
          theater={bookingState.theater!}
          showtime={bookingState.showtime!}
          seats={bookingState.seats!}
          onConfirmBooking={handleConfirmBooking}
          onBack={handleBack}
        />
      );
    case 'confirmation':
      return (
        <BookingConfirmation
          booking={bookingState.booking!}
          onNewBooking={handleNewBooking}
        />
      );
    default:
      return (
        <MovieList
          movies={movies}
          onSelectMovie={handleSelectMovie}
        />
      );
  }
}

export default App;