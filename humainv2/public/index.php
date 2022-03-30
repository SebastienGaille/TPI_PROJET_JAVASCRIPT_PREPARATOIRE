<?php
    session_start();

    if (isset($_REQUEST['username'])) {
        $_SESSION['username'] = htmlentities($_REQUEST['username']);
    }
    

    if (isset($_REQUEST['logout'])) {
        unset($_SESSION['username']);
        header('location: /');
        die();
    }

    $isAuth = isset($_SESSION['username']);
?><!DOCTYPE html>
<html lang="fr">

<head>
    <title>Le jeu</title>
    <meta charset="utf-8">
    <script type="module" src="js/main.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        
        canvas {
            display: block;
            width: 100vw;
            height: 100vh;            
        }
        
        .sprite {
            display: none;
        }

        #info {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 100;
        }
    </style>
</head>

<body>
    <?php if (!$isAuth) : ?>
        <form method="post">
            <input type="text" placeholder="nom du joueur" name="username" required>
            <input type="submit" value="jouer">
        </form>
    <?php else : ?>
        <canvas></canvas>
        <img class="sprite" id="player" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/350b91f0-ad9d-4d63-9a0d-a10361c3b685/d6gfouv-d8377271-7f1b-4256-8dca-8263f3e7a64b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1MGI5MWYwLWFkOWQtNGQ2My05YTBkLWExMDM2MWMzYjY4NVwvZDZnZm91di1kODM3NzI3MS03ZjFiLTQyNTYtOGRjYS04MjYzZjNlN2E2NGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RhtpRNEMCTlvxgzHQ0XWb-bTV8BwzfppdRjjqlOYx50">
        <img class="sprite" id="rock" src="img/rocher.png">
        <img class="sprite" id="tree" src="img/sapin.png">
        <img class="sprite" id="ice" src="img/neige.png">
        <div id="info">
            Joueur: <?php echo $_SESSION['username']; ?>
            <br>
            Score: <span id="score">0</span>
            <br>
            <a href="?logout">déconnexion</a>
        </div>
    <?php endif; ?>
</body>

</html>