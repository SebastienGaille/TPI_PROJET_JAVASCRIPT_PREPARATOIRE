<?php 
  header('Content-Type: application/json');
  echo file_get_contents('../private/gameData.json');

// require_once "../private/MyDB.php";
// $db = new MyDB();

// // $db->exec('CREATE TABLE foo (bar STRING)');
// // $db->exec("INSERT INTO foo (bar) VALUES ('Ceci est un test')");

// $result = $db->query('SELECT bar FROM foo');
// var_dump($result->fetchArray());
