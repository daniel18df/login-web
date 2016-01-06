<?

require_once('require/config.php');
//head
require_once('require/head-gbl.php');

    if(!empty($_SESSION['usuario'])){ //no ha seleccionado rol pero inicio session
         require('require/index.php');
    }
    if(empty($_SESSION['usuario'])){
    	 require('require/log.php');
    }

//footer
require_once('require/footer-gbl.php');
?>
