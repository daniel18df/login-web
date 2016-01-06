<?
session_start();

// Destruir todas las variables de sesión.
//session_unset();
$_SESSION = array();
session_destroy();

//redirecciona al login
header('Location: ../');

?>