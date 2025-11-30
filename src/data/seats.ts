import { Seat } from '../types';

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  rows.forEach((row, rowIndex) => {
    const seatsInRow = rowIndex < 3 ? 10 : rowIndex < 7 ? 12 : 14;
    
    for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
      const isAvailable = Math.random() > 0.3; // 70% seats available
      let type: 'regular' | 'premium' | 'vip' = 'regular';
      let price = 12;
      
      if (rowIndex >= 7) {
        type = 'vip';
        price = 25;
      } else if (rowIndex >= 4) {
        type = 'premium';
        price = 18;
      }
      
      seats.push({
        id: `${row}${seatNum}`,
        row,
        number: seatNum,
        isAvailable,
        isSelected: false,
        type,
        price
      });
    }
  });
  
  return seats;
};