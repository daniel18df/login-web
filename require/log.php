<div id="login-modal" class="modal">
    <div class="modal-content">
      <h4>Inicio de sesion</h4>
			  <div class="row">
			    <form class="col s12">
			      <div class="row">
			        <div class="input-field col s12">
			          <input id="Usuario" type="text" class="validate">
			          <label for="Usuario">Usuario</label>
			        </div>
			        <div class="input-field col s12">
			          <input id="password" type="password" class="validate">
			          <label for="password">Contraseña</label>
			        </div>
			      </div>
			      
			    </form>
			  </div>
      </div>
    <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat login">Aceptar</a>
    </div>
  </div>
<script>
  $('#login-modal').openModal();   

      
  $(".login").click(function(){

        login();
  });
	//login
function login(){

    var usuario = document.getElementById("Usuario").value;
    var password = document.getElementById("password").value;

    var urlmod="require/getuser.php?usuario="+usuario+"&password="+password;

        $.ajax({url:urlmod,
                data:'&callback=?',
                type: "GET",
                dataType: "jsonp",
//                async: true,
                success: function(data){
                    if (data.status =="OK") {
                    
                        $("body").load("require/index.php");
                     }
                     else{
                            $("body").load("index.php");
                            alert("usuario incorrecto");
                     }
                }
       }); 

}


</script>




