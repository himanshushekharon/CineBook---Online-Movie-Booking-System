import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    poster: '/avengers.webp',
    description: 'After the devastating events, the Avengers assemble once more to reverse Thanos\'s actions and restore balance to the universe.',
    duration: 181,
    rating: 'PG-13',
    genre: ['Action', 'Adventure', 'Fantasy'],
    showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  {
    id: '2',
    title: 'Dangal',
    poster: '/dangal.jpg',
    description: 'A former wrestler trains his daughters to compete in the sport, challenging the social norms of his village.',
    duration: 161,
    rating: 'PG',
    genre: ['Drama', 'Sport', 'Biography'],
    showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
  },
  {
    id: '3',
    title: 'Fast & Furious 9',
    poster: '/f9.jpg',
    description: 'Dom Toretto and his crew face off against his brother and a powerful AI to save the world.',
    duration: 145,
    rating: 'PG-13',
    genre: ['Action', 'Adventure', 'Thriller'],
    showtimes: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
  },
  {
    id: '4',
    title: 'Titanic',
    poster: '/titanic.jpeg',
    description: 'A love story aboard the ill-fated RMS Titanic during its maiden voyage.',
    duration: 194,
    rating: 'PG-13',
    genre: ['Romance', 'Drama', 'Disaster'],
    showtimes: ['11:30 AM', '3:00 PM', '6:30 PM', '10:00 PM']
  },
  {
    id: '5',
    title: 'Happy New Year',
    poster: '/happy new year.jpeg',
    description: 'A group of friends plan an elaborate heist in Paris during New Year\'s celebrations.',
    duration: 138,
    rating: 'PG',
    genre: ['Action', 'Adventure', 'Fantasy'],
    showtimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM']
  },
  {
    id: '6',
    title: 'Avatar',
    poster: '/avatar.jpeg',
    description: 'A paraplegic Marine is dispatched to the moon Pandora on an important mission that becomes a turning point in his life.',
    duration: 162,
    rating: 'PG-13',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
  }
];