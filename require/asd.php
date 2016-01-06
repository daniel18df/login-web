<? session_start();
echo $_SESSION["usuario"];
  if(!isset($_SESSION["usuario"])){
      //se redirecciona a la pagina principal
      header("location: ../index.php");
    }
?>
<!DOCTYPE html>
<html lang="es">

<head>

  <meta name="viewport" content="initial-scale=1.0">

  <title>Coordinate</title>
   <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

   <script>if (!window.jQuery) { document.write('<script src="bin/jquery-2.1.1.min.js"><\/script>'); }</script>
   
   <!-- CSS-->
    <link href="../css/ghpages-materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
    <!-- <link href="bin/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"> -->
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link href="../css/base.css" type="text/css" rel="stylesheet" media="screen,projection">
    
    <script src="../bin/materialize.js"></script>

  <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
<a href="cerrar.php"> cerrar sesion </a>
              <a href="#"><?echo $_SESSION["usuario"]?></a>
            </div>
          </div>
        </div>
      </div>
   </body>
</html>

