<?php 
  header('Content-Type: application/json');
  $json = file_get_contents('../private/gameData.json');
  $data = json_decode($json);
  $data->score++;
  $json = json_encode($data);
  file_put_contents('../private/gameData.json', $json);  

// require_once "../private/MyDB.php";
// $db = new MyDB();

// // $db->exec('CREATE TABLE foo (bar STRING)');
// // $db->exec("INSERT INTO foo (bar) VALUES ('Ceci est un test')");

// $result = $db->query('SELECT bar FROM foo');
// var_dump($result->fetchArray());
