// Function to update the header based on login status
function updateHeader() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const authLinks = document.getElementById('auth-links');
    const dashboardLinks = document.getElementById('dashboard-links');

    if (currentUser) {
        // User is logged in: Show dashboard and logout, hide register and login
        authLinks.style.display = 'none';
        dashboardLinks.style.display = 'flex'; // Use 'flex' for proper styling in nav
    } else {
        // User is not logged in: Show register and login, hide dashboard and logout
        authLinks.style.display = 'flex';
        dashboardLinks.style.display = 'none';
    }
}

// Run this function when the page loads
window.addEventListener('DOMContentLoaded', () => {
    updateHeader();

    // Ensure logout link works if present
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Remove current user from localStorage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');

            // Update the header
            updateHeader();

            // Redirect to the home or login page
            window.location.href = 'index.html';
        });
    }
});

// Handle login
document.querySelector('#login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    // Check if user exists and the password matches
    if (user && user.password === password) {
        // Successful login
        localStorage.setItem('currentUser', JSON.stringify(user)); // Store the current user
        localStorage.setItem('isLoggedIn', 'true'); // Store login status as true
        window.location.href = 'index.html'; // Redirect to the dashboard
    } else {
        // Unsuccessful login
        alert('Invalid email or password. Please try again.');
        localStorage.setItem('isLoggedIn', 'false'); // Explicitly set login status to false
    }
});
