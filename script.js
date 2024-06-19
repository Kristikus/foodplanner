document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged 
    if (localStorage.getItem('loggedInUser')) {
        displayLoggedInNav();
    } else {
        displayLoggedOutNav();
    }

    // signup form
    const signupForm = document.querySelector('.registration-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Store the user's information
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            window.location.href = 'login.html';
        });
    }

    // login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Check user's 
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Connexion réussie!');
                window.location.href = 'planning.html';
            } else {
                alert('Email ou mot de passe incorrect.');
            }
        });
    }

    // logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('Déconnexion réussie!');
            window.location.href = 'index.html';
        });
    }
});

