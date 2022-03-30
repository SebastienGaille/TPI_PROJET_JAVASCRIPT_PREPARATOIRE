<?php
  session_start();
  $score = $_REQUEST['score'];
  $username = $_SESSION['username'] ?? 'anonymous';

  file_put_contents('score.json', json_encode([$username, $score]));