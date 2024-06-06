<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foodplanner - Inscription</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Kavoon&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container">
            <img src="" alt="logo of foodplanner" class="logo mx-auto">
        </div>
    </nav>

    <div class="container d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center">
        <h1 class="title">Foodplanner</h1>
        <p class="description">
            Simplify your daily life <br>
            and get varied and tasty recipes every week <br>
            integrated directly into your schedule. All generated automatically for you.
        </p>
        <div class="w-75 mt-4">
            <form class="registration-form p-4">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>
                <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
                <p class="signin-prompt mt-3">
                    Have an account? <a href="#">Click here to sign in</a>
                </p>
            </form>
        </div>
    </div>

    <footer class="footer bg-dark text-center py-3 mt-auto">
        <img src="" alt="logo of foodplanner" class="logo">
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
