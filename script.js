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
            alert('Successful registration! You can now connect.');
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
                alert('Succssful connection!');
                window.location.href = 'planning.html';
            } else {
                alert('Incorrect email or password.');
            }
        });
    }

    // logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            sessionStorage.removeItem('dataUrl');
            alert('Successful disconnection!');
            window.location.href = 'login.html';
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in to know which navigation bar to display
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Show nav if user is not logged in
        document.querySelector('.nav-not-connected').style.display = 'block';
        // Redirect the user to the login page if he tries to go on the planning page while not logged in
        if (window.location.pathname === '/planning.html' || window.location.pathname === '/recipes.html' || window.location.pathname === '/recipe.html') {
            window.location.href = 'login.html';
            console.log("You need to login");
        }
        
    } 
    else {
        // Redirect the logged in user to the planning page
        if (window.location.pathname === '/login.html' || window.location.pathname === '/signup.html') {
            window.location.href = 'planning.html';
        }
};

    // Manage registration
    const signupForm = document.querySelector('.registration-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Store user information in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            window.location.href = 'login.html';
        });
    }

    // Manage connection
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Check user credentials
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

    // Manage disconnection
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('Déconnexion réussie!');
            window.location.href = 'login.html';
        });
    }
});

function displayLoggedInNav() {
    const navItems = document.querySelector('.navbar-nav');
    navItems.innerHTML += '<li class="nav-item"><a class="nav-link" href="#" id="logoutButton">Logout</a></li>';
    document.querySelector('.nav-not-connected').style.display = 'none';
}

function displayLoggedOutNav() {
    document.querySelector('.nav-not-connected').style.display = 'block';
    document.querySelector('.navbar').style.display = 'none';
}

