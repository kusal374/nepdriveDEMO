// Supabase Configuration
const SUPABASE_URL = 'your_supabase_url';
const SUPABASE_ANON_KEY = 'your_supabase_anon_key';
const API_URL = 'http://localhost:3000/api';

// Helper Functions
const getToken = () => localStorage.getItem('token');
const getUserId = () => localStorage.getItem('userId');

const api = {
    async signup(userData) {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    async login(credentials) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    async getProfile(userId) {
        const response = await fetch(`${API_URL}/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.json();
    },

    async requestRide(rideData) {
        const response = await fetch(`${API_URL}/ride/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(rideData)
        });
        return response.json();
    },

    async updateLocation(location) {
        const response = await fetch(`${API_URL}/location/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                userId: getUserId(),
                location
            })
        });
        return response.json();
    }
};

// Form Handlers
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await api.signup({
                email: formData.get('email'),
                password: formData.get('password'),
                fullName: formData.get('fullName'),
                phone: formData.get('phone'),
                role: 'user'
            });
            
            if (response.success) {
                localStorage.setItem('token', response.session.access_token);
                localStorage.setItem('userId', response.user.id);
                window.location.href = 'profile.html';
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    });
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await api.login({
                email: formData.get('email'),
                password: formData.get('password')
            });
            
            if (response.success) {
                localStorage.setItem('token', response.session.access_token);
                localStorage.setItem('userId', response.session.user.id);
                window.location.href = 'profile.html';
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    });
}

// Profile Page
if (document.querySelector('.profile-content')) {
    const loadProfile = async () => {
        try {
            const response = await api.getProfile(getUserId());
            if (response.success) {
                document.getElementById('profileName').textContent = response.profile.full_name;
                document.getElementById('profileEmail').textContent = response.profile.email;
                document.getElementById('profilePhone').textContent = response.profile.phone;
                document.getElementById('profileRole').textContent = response.profile.role;
            } else {
                alert('Failed to load profile. Please try again.');
            }
        } catch (error) {
            console.error('Profile loading error:', error);
            alert('An error occurred while loading your profile. Please try again.');
        }
    };
    
    loadProfile();
}

// Ride Booking
if (document.getElementById('bookingForm')) {
    document.getElementById('bookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await api.requestRide({
                userId: getUserId(),
                pickup: formData.get('pickup'),
                destination: formData.get('destination')
            });
            
            if (response.success) {
                alert('Ride booked successfully!');
                window.location.href = 'tracking.html';
            } else {
                alert('Failed to book ride. Please try again.');
            }
        } catch (error) {
            console.error('Ride booking error:', error);
            alert('An error occurred while booking your ride. Please try again.');
        }
    });
}

// Tracking Page
if (document.querySelector('.tracking-content')) {
    const setupTracking = async () => {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const subscription = supabase
            .from('rides')
            .on('UPDATE', payload => {
                updateRideStatus(payload.new);
            })
            .subscribe();
            
        window.addEventListener('beforeunload', () => {
            subscription.unsubscribe();
        });
    };
    
    const updateRideStatus = (ride) => {
        document.getElementById('currentStatus').textContent = ride.status;
        document.getElementById('driverName').textContent = ride.driver_name || '-';
        document.getElementById('vehicleInfo').textContent = ride.vehicle_info || '-';
        document.getElementById('estimatedTime').textContent = ride.eta || '-';
    };
    
    setupTracking();
}

// Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
};

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
}

// Logout Handler
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = 'login.html';
    });
}

// Initialize Google Maps functionality
function initMap() {
    const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 8
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// Open Google Maps with current location
document.getElementById('openGoogleMaps').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
        }, () => {
            alert('Unable to get your location. Please check your settings and try again.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// View in App functionality
document.getElementById('viewInApp').addEventListener('click', () => {
    // Implement in-app map view logic here
    alert('In-app map view is not implemented in this demo.');
});

