<?php

    try{        

       $dbh = new pdo('mysql:host='.$hostBD.';dbname='.$dbname_cloud, $user_cloud,$pass_cloud);
       
    }catch(PDOException $ex){
        die(json_encode(
            array('outcome2' => false, 'message' => 'Unable to connect')
            )
        );
    }
