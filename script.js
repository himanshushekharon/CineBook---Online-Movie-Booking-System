
const movies = [
    {
        id: '1',
        title: 'Titanic',
        poster: '/public/titanic.jpeg',
        description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
        duration: 194,
        rating: 'U/A 13+',
        genre: ['Romance', 'Drama'],
        languages: ['English', 'Hindi'],
        votes: '8.8/10',
        votesCount: '1.2M',
        showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
    },
    {
        id: '2',
        title: 'Avengers: Endgame',
        poster: '/public/avengers.webp',
        description: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
        duration: 181,
        rating: 'U/A 13+',
        genre: ['Action', 'Adventure', 'Drama'],
        languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
        votes: '8.4/10',
        votesCount: '1.8M',
        showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
    },
    {
        id: '3',
        title: 'Happy New Year',
        poster: '/public/happy new year.jpeg',
        description: 'A team of losers win the love of millions in their quest to pull off the perfect world cup heist.',
        duration: 180,
        rating: 'U',
        genre: ['Action', 'Comedy', 'Crime'],
        languages: ['Hindi', 'Tamil', 'Telugu'],
        votes: '5.1/10',
        votesCount: '45K',
        showtimes: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
    },
    {
        id: '4',
        title: 'Fast & Furious 9',
        poster: '/public/f9.jpg',
        description: 'Dom and the crew must take on an international terrorist who turns out to be Dom and Mia\'s estranged brother.',
        duration: 143,
        rating: 'U/A 13+',
        genre: ['Action', 'Crime', 'Thriller'],
        languages: ['English', 'Hindi'],
        votes: '5.2/10',
        votesCount: '189K',
        showtimes: ['11:30 AM', '3:00 PM', '6:30 PM', '10:00 PM']
    },
    {
        id: '5',
        title: 'Avatar',
        poster: '/public/avatar.jpeg',
        description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        duration: 162,
        rating: 'U/A 13+',
        genre: ['Action', 'Adventure', 'Fantasy'],
        languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
        votes: '7.9/10',
        votesCount: '1.3M',
        showtimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM']
    },
    {
        id: '6',
        title: 'Dangal',
        poster: '/public/dangal.jpg',
        description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
        duration: 161,
        rating: 'U',
        genre: ['Biography', 'Drama', 'Sport'],
        languages: ['Hindi', 'Tamil', 'Telugu'],
        votes: '8.4/10',
        votesCount: '189K',
        showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
    }
];

// Theater data with different cities
const theatersByCity = {
    'Mumbai': [
        {
            id: '1',
            name: 'PVR Cinemas: Phoenix MarketCity',
            location: 'Kurla West, Mumbai',
            distance: '2.5 km',
            features: ['Dolby Atmos', 'Recliner Seats']
        },
        {
            id: '2',
            name: 'INOX: R-City Mall',
            location: 'Ghatkopar West, Mumbai',
            distance: '4.2 km',
            features: ['4DX', 'IMAX']
        },
        {
            id: '3',
            name: 'Cinepolis: Viviana Mall',
            location: 'Thane West, Mumbai',
            distance: '8.1 km',
            features: ['Premium Seats', 'Dolby Atmos']
        },
        {
            id: '4',
            name: 'PVR Cinemas: Oberoi Mall',
            location: 'Goregaon East, Mumbai',
            distance: '12.3 km',
            features: ['Gold Class', 'Recliner Seats']
        }
    ],
    'Delhi': [
        {
            id: '5',
            name: 'PVR Cinemas: Select City Walk',
            location: 'Saket, New Delhi',
            distance: '3.2 km',
            features: ['IMAX', 'Dolby Atmos']
        },
        {
            id: '6',
            name: 'INOX: Nehru Place',
            location: 'Nehru Place, New Delhi',
            distance: '5.8 km',
            features: ['4DX', 'Premium Seats']
        },
        {
            id: '7',
            name: 'Cinepolis: DLF Mall',
            location: 'Noida, Delhi NCR',
            distance: '15.2 km',
            features: ['VIP Seats', 'Dolby Atmos']
        }
    ],
    'Bangalore': [
        {
            id: '8',
            name: 'PVR Cinemas: Forum Mall',
            location: 'Koramangala, Bangalore',
            distance: '4.1 km',
            features: ['IMAX', 'Gold Class']
        },
        {
            id: '9',
            name: 'INOX: Garuda Mall',
            location: 'Magrath Road, Bangalore',
            distance: '6.3 km',
            features: ['4DX', 'Recliner Seats']
        }
    ]
};

// Global state
let currentBooking = {
    movie: null,
    theater: null,
    showtime: null,
    seats: [],
    customerInfo: null
};

let allSeats = [];
let selectedSeats = [];
let timer;
let currentCity = 'Mumbai';
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    setupEventListeners();
    updateCityDisplay();
});

// Modal functions
function openSignInModal() {
    document.getElementById('signin-modal').classList.add('active');
}

function closeSignInModal() {
    document.getElementById('signin-modal').classList.remove('active');
}

function openLocationModal() {
    document.getElementById('location-modal').classList.add('active');
}

function closeLocationModal() {
    document.getElementById('location-modal').classList.remove('active');
}

function selectCity(city) {
    currentCity = city;
    updateCityDisplay();
    closeLocationModal();
    // Reload theaters if on theater screen
    if (document.getElementById('theater-screen').classList.contains('active')) {
        loadTheaterSelection();
    }
}

function updateCityDisplay() {
    document.getElementById('current-city').textContent = currentCity;
    document.getElementById('banner-city').textContent = currentCity;
    const theatersCityElement = document.getElementById('theaters-city');
    if (theatersCityElement) {
        theatersCityElement.textContent = currentCity;
    }
}

function showSignUpForm() {
    alert('Sign up functionality would be implemented here');
}

function showForgotPassword() {
    alert('Forgot password functionality would be implemented here');
}

function signIn(email, password) {
    // Simple demo sign in - in real app, this would validate against a backend
    currentUser = {
        name: email.split('@')[0] || 'User',
        email: email,
        initial: (email.split('@')[0] || 'U')[0].toUpperCase()
    };
    
    // Update UI
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('user-menu').style.display = 'block';
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    document.getElementById('user-initial').textContent = currentUser.initial;
    
    closeSignInModal();
}

function signOut() {
    currentUser = null;
    document.getElementById('signin-button').style.display = 'block';
    document.getElementById('user-menu').style.display = 'none';
}

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Start timer for seat selection
    if (screenId === 'seat-screen') {
        startTimer();
    } else {
        stopTimer();
    }
}

// Timer functionality
function startTimer() {
    let timeLeft = 600; // 10 minutes
    const timerDisplay = document.getElementById('timer-display');
    
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Session expired! Please start again.');
            startNewBooking();
        }
        timeLeft--;
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
    }
}

// Load movies
function loadMovies() {
    const moviesGrid = document.getElementById('movies-grid');
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Create movie card
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => selectMovie(movie);

    card.innerHTML = `
        <div class="movie-poster-container">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-rating">${movie.rating}</div>
            <div class="movie-votes">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                ${movie.votes} (${movie.votesCount})
            </div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-genres">${movie.genre.join(', ')}</div>
            <div class="movie-languages">
                ${movie.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
            </div>
            <button class="book-btn">Book tickets</button>
        </div>
    `;

    return card;
}

// Select movie
function selectMovie(movie) {
    currentBooking.movie = movie;
    loadTheaterSelection();
    showScreen('theater-screen');
}

// Load theater selection
function loadTheaterSelection() {
    const movie = currentBooking.movie;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-movie').textContent = movie.title;
    
    // Update movie header
    document.getElementById('selected-movie-poster').src = movie.poster;
    document.getElementById('selected-movie-poster').alt = movie.title;
    document.getElementById('selected-movie-title').textContent = movie.title;
    document.getElementById('movie-rating').textContent = movie.rating;
    document.getElementById('movie-genres').textContent = movie.genre.join(' • ');
    document.getElementById('movie-duration').textContent = `${movie.duration} mins`;
    document.getElementById('selected-movie-description').textContent = movie.description;

    // Load theaters for current city
    const theaters = theatersByCity[currentCity] || theatersByCity['Mumbai'];
    const theatersList = document.getElementById('theaters-list');
    theatersList.innerHTML = '';

    theaters.forEach(theater => {
        const theaterCard = createTheaterCard(theater, movie);
        theatersList.appendChild(theaterCard);
    });
    
    updateCityDisplay();
}

// Create theater card
function createTheaterCard(theater, movie) {
    const card = document.createElement('div');
    card.className = 'theater-card';

    card.innerHTML = `
        <div class="theater-header">
            <div class="theater-info">
                <h4>${theater.name}</h4>
                <div class="theater-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${theater.location} • ${theater.distance}
                </div>
            </div>
            <div class="theater-features">
                ${theater.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        </div>
        <div class="showtimes">
            ${movie.showtimes.map(time => 
                `<button class="showtime-btn" onclick="selectTheater('${theater.id}', '${time}')">${time}</button>`
            ).join('')}
        </div>
    `;

    return card;
}

// Select theater and showtime
function selectTheater(theaterId, showtime) {
    const allTheaters = Object.values(theatersByCity).flat();
    const theater = allTheaters.find(t => t.id === theaterId);
    currentBooking.theater = theater;
    currentBooking.showtime = showtime;
    
    generateSeats();
    loadSeatSelection();
    showScreen('seat-screen');
}

// Generate seats
function generateSeats() {
    allSeats = [];
    selectedSeats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    rows.forEach((row, rowIndex) => {
        let seatsInRow = 14;
        let type = 'normal';
        let price = 120;
        
        if (rowIndex < 3) {
            seatsInRow = 12;
            type = 'normal';
            price = 120;
        } else if (rowIndex < 8) {
            seatsInRow = 14;
            type = 'executive';
            price = 160;
        } else {
            seatsInRow = 12;
            type = 'premium';
            price = 200;
        }
        
        for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
            const isAvailable = Math.random() > 0.25; // 75% seats available
            
            allSeats.push({
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
}

// Load seat selection
function loadSeatSelection() {
    const movie = currentBooking.movie;
    const theater = currentBooking.theater;
    const showtime = currentBooking.showtime;

    // Update header
    document.getElementById('seat-movie-title').textContent = movie.title;
    document.getElementById('seat-theater-name').textContent = theater.name;
    document.getElementById('seat-showtime').textContent = showtime;

    // Create seat map
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = '';

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    rows.forEach(row => {
        const rowSeats = allSeats.filter(seat => seat.row === row);
        const seatRow = document.createElement('div');
        seatRow.className = 'seat-row';
        
        seatRow.innerHTML = `
            <span class="row-label">${row}</span>
            ${rowSeats.map(seat => 
                `<button class="seat ${seat.type} ${seat.isAvailable ? 'available' : 'sold'}" 
                         data-seat-id="${seat.id}" 
                         ${!seat.isAvailable ? 'disabled' : ''}
                         onclick="toggleSeat('${seat.id}')"
                         title="${seat.row}${seat.number} - ₹${seat.price}">
                    ${seat.number}
                </button>`
            ).join('')}
        `;
        
        seatMap.appendChild(seatRow);
    });

    updateSeatSummary();
}

// Toggle seat selection
function toggleSeat(seatId) {
    const seat = allSeats.find(s => s.id === seatId);
    if (!seat || !seat.isAvailable) return;

    seat.isSelected = !seat.isSelected;
    
    const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
    if (seat.isSelected) {
        seatElement.classList.add('selected');
        selectedSeats.push(seat);
    } else {
        seatElement.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s.id !== seatId);
    }

    updateSeatSummary();
}

// Update seat summary
function updateSeatSummary() {
    const selectedCount = document.getElementById('selected-count');
    const selectedSeatsList = document.getElementById('selected-seats-list');
    const ticketsPrice = document.getElementById('tickets-price');
    const convenienceFee = document.getElementById('convenience-fee');
    const totalPrice = document.getElementById('total-price');
    const proceedBtn = document.getElementById('proceed-btn');

    selectedCount.textContent = selectedSeats.length;

    if (selectedSeats.length === 0) {
        selectedSeatsList.innerHTML = '<div class="seat-item">No seats selected</div>';
        ticketsPrice.textContent = '₹ 0.00';
        convenienceFee.textContent = '₹ 0.00';
        totalPrice.textContent = '₹ 0.00';
        proceedBtn.disabled = true;
    } else {
        selectedSeatsList.innerHTML = selectedSeats.map(seat => 
            `<div class="seat-item">
                <span>${seat.row}${seat.number} (${seat.type})</span>
                <span>₹ ${seat.price}.00</span>
            </div>`
        ).join('');

        const ticketsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        const convFee = Math.round(ticketsTotal * 0.18); // 18% convenience fee
        const total = ticketsTotal + convFee;

        ticketsPrice.textContent = `₹ ${ticketsTotal}.00`;
        convenienceFee.textContent = `₹ ${convFee}.00`;
        totalPrice.textContent = `₹ ${total}.00`;
        proceedBtn.disabled = false;
    }

    currentBooking.seats = selectedSeats;
}

// Load booking form
function loadBookingForm() {
    const movie = currentBooking.movie;
    const theater = currentBooking.theater;
    const showtime = currentBooking.showtime;
    const seats = currentBooking.seats;

    // Pre-fill user info if signed in
    if (currentUser) {
        document.getElementById('email').value = currentUser.email;
        document.getElementById('fullname').value = currentUser.name;
    }

    // Update summary
    document.getElementById('summary-poster').src = movie.poster;
    document.getElementById('summary-poster').alt = movie.title;
    document.getElementById('summary-movie-title').textContent = movie.title;
    document.getElementById('summary-movie-details').textContent = `${movie.rating} • ${movie.duration} mins`;
    document.getElementById('summary-cinema').textContent = theater.name;
    document.getElementById('summary-datetime').textContent = `Today, 15 Jan 2025 • ${showtime}`;
    document.getElementById('summary-seats').textContent = seats.map(seat => `${seat.row}${seat.number}`).join(', ');

    const ticketsTotal = seats.reduce((sum, seat) => sum + seat.price, 0);
    const convFee = Math.round(ticketsTotal * 0.18);
    const total = ticketsTotal + convFee;

    document.getElementById('summary-tickets-price').textContent = `₹ ${ticketsTotal}.00`;
    document.getElementById('summary-convenience-fee').textContent = `₹ ${convFee}.00`;
    document.getElementById('summary-total-price').textContent = `₹ ${total}.00`;
}

// Setup event listeners
function setupEventListeners() {
    // Sign in form
    document.getElementById('signin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        signIn(email, password);
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Payment method selection
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-method').forEach(method => {
                method.classList.remove('active');
            });
            this.closest('.payment-method').classList.add('active');
        });
    });

    // Booking form submission
    document.getElementById('booking-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const customerInfo = {
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            fullname: document.getElementById('fullname').value
        };

        currentBooking.customerInfo = customerInfo;

        // Show processing state
        const payBtn = document.getElementById('pay-btn');
        const originalText = payBtn.textContent;
        payBtn.textContent = 'Processing Payment...';
        payBtn.disabled = true;

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Reset button state
        payBtn.textContent = originalText;
        payBtn.disabled = false;

        // Show confirmation
        loadConfirmation();
        showScreen('confirmation-screen');
    });

    // Load booking form when screen changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'booking-screen' && mutation.target.classList.contains('active')) {
                loadBookingForm();
            }
        });
    });

    observer.observe(document.getElementById('booking-screen'), {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Load confirmation
function loadConfirmation() {
    const booking = currentBooking;
    const bookingId = `FS${Date.now().toString().slice(-8)}`;
    const ticketsTotal = booking.seats.reduce((sum, seat) => sum + seat.price, 0);
    const convFee = Math.round(ticketsTotal * 0.18);
    const total = ticketsTotal + convFee;

    // Update confirmation details
    document.getElementById('ticket-movie-title').textContent = booking.movie.title;
    document.getElementById('ticket-movie-meta').textContent = `${booking.movie.rating} • ${booking.movie.duration} mins`;
    document.getElementById('ticket-booking-id').textContent = bookingId;
    document.getElementById('ticket-cinema').textContent = booking.theater.name;
    document.getElementById('ticket-datetime').textContent = `Today, 15 Jan 2025 • ${booking.showtime}`;
    document.getElementById('ticket-seats').textContent = booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ');
    document.getElementById('ticket-amount').textContent = `₹ ${total}.00`;
}

// Start new booking
function startNewBooking() {
    currentBooking = {
        movie: null,
        theater: null,
        showtime: null,
        seats: [],
        customerInfo: null
    };
    allSeats = [];
    selectedSeats = [];
    
    // Reset form
    document.getElementById('booking-form').reset();
    
    // Reset payment method
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('active');
    });
    document.querySelector('.payment-method').classList.add('active');
    document.getElementById('upi').checked = true;
    
    stopTimer();
    showScreen('movie-screen');
}