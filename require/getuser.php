<?php

session_start();


require("config.php");
require("db_cloud.php");


$usuario = $_GET['usuario'];
$password = $_GET['password'];


$strQuery="SELECT * FROM usuario where usuario = '$usuario' AND password ='$password'";


$query = $dbh->prepare($strQuery);$query->execute();
  
      while($data = $query->fetch()){

          $rows[] = array(
                    "id" => (isset($data['id']) ? $data['id'] : "0")
          );
$_SESSION['usuario']=$data['usuario'];
      }


    if (isset($rows)) {
        
        $json = "{\"status\":\"OK\",\"result\":".json_encode($rows)."}";
    }
    else {
        $json = "{\"status\":\"ERROR\"}";
    }


$callback = $_GET['callback'];
echo $callback.'('. $json . ')'; 

