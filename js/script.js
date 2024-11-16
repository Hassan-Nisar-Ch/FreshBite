// Menu and Navbar Toggle
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Modal Elements for Image Viewing
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Window Scroll Event Handling
window.onscroll = () => {
    // Close Menu and Navbar on Scroll
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Header visibility on Scroll
    if (window.scrollY > 150) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }

    // Show/Hide Back to Top Button based on Scroll Position
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};



// Toggle Menu Visibility
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// Highlight the Current Page's Navigation Link
window.onload = () => {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'home.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Fade Out Effect on Link Click
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

// Scroll to Top on Button Click
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Image Click to Open Modal in Gallery
document.querySelectorAll('.gallery .row img').forEach(image => {
    image.addEventListener('click', () => {
        if (image.src) { // Only proceed if there's a valid image source
            modal.style.display = "flex";
            modalImage.src = image.src;
            disableScroll();
        }
    });
});

// Close Modal and Reset Image
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        modalImage.src = ""; // Reset the source to ensure modal stays closed on refresh
        enableScroll();
    });
} else {
    console.error("closeModal element not found in the DOM.");
}

// Disable and Enable Scroll Functions
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

// Countdown Functionality for Next Midnight
function getNextMidnight() {
    const now = new Date();
    // Set the countdown target to midnight of the next day
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime();
}

function startCountdown() {
    const targetDate = getNextMidnight();

    function updateCountdown() {
        const now = new Date().getTime();
        const gap = targetDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const second = 1000,
              minute = second * 60,
              hour = minute * 60,
              day = hour * 24;

        const days = Math.floor(gap / day);
        const hours = Math.floor((gap % day) / hour);
        const minutes = Math.floor((gap % hour) / minute);
        const seconds = Math.floor((gap % minute) / second);

        // Display Countdown
        document.getElementById('day').innerText = days.toString().padStart(2, '0');
        document.getElementById('hour').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minute').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('second').innerText = seconds.toString().padStart(2, '0');

        // Check if the countdown has reached zero and restart it for the next day
        if (gap <= 0) {
            clearInterval(interval);
            startCountdown(); // Reset the countdown for the next midnight
        }
    }

    // Update Countdown Every Second
    const interval = setInterval(updateCountdown, 1000);
}

// Initialize Countdown on Page Load
document.addEventListener("DOMContentLoaded", startCountdown);



// Email Validation Function
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
