
var map; 
var divname='gs-map';
//var markerDir;
var geocoder;

var marker_ruta = [];

var infowindow = new google.maps.InfoWindow();

var markers=[];
var heatmap;
var empresaUser;
var equipoUSer;


///
///
///
var marks = [];
//var marker = new google.maps.Marker({});
var bounds = new google.maps.LatLngBounds();
var arrRuta = [];
var idUSer =[];

var equipos =[];
var zIdUSer=0;

///
///
///


function changesizemap()
{//navbar-fixed
    var sizeheader=$('.nav-wrapper').height();
    var sizewindow=$( window ).height();
    //alert(sizewindow);
    mapheight=sizewindow-sizeheader;
    
    var mapDiv = document.getElementById(divname);
    mapDiv.style.height = mapheight;
    
    $('#'+divname).css({ "height":mapheight}); 
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
}


 $(document).ready(function() {
     $('select').material_select();
//     $(".dropdown-button").dropdown();
     $(".button-collapse").sideNav();     
     $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false,
          hover: true,
          gutter: 0,
          belowOrigin: false,
          alignment: 'left'
      });
  });




function gs_initialize(authResult, em, eq, rol) {

//empresa, equipo y rol usuario
empresaUser = em;
equipoUSer = eq;
rolUSer = rol;

//Carga menu
 gs_menus();

//equipos empresa
getEquipos(empresaUser);

    /*** MAPA ****/
    heatmap = new google.maps.visualization.HeatmapLayer();
    
    google.maps.visualRefresh = true;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-33.467, -70.644);
    var mapOptions = {
        zoom: 15,
        center: latlng
    }

    var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
      (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
   

    var sizeheader=$('.nav-wrapper').height();
    var sizewindow=$( window ).height();
     mapheight=sizewindow-sizeheader-5;

    var mapDiv = document.getElementById(divname);
    mapDiv.style.width = isMobile ? '100%' : '100%';
    mapDiv.style.height = mapheight;

     $('#'+divname).css({ "height":mapheight});

    google.maps.event.addDomListener(window, "resize", function() {
        changesizemap();
    });

    
    map = new google.maps.Map(mapDiv, mapOptions);   
    /*** MAPA ****/


   

   ////
   ////
   ///
var myDataRef = new Firebase('https://geo-coordinate.firebaseio.com/posicion_actual');

//CARGAR USUARIO CON FIREBASE

        myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();

          if(message.empresa==empresaUser){

            //puede ver todos los equipos (administrador)
              if(rolUSer==1){

                 crearMarkerUser(message);
              
              }

            //puede ver su equipo y tiene menos funcionalidades (asesor)
              if(rolUSer==2){
                if(message.equipo == equipoUSer){

                    crearMarkerUser(message);
    
                }
              }
            //puede ver a su equipo y usar todas las funcionalidades
              if(rolUSer==3){
                if(message.equipo == equipoUSer){

                    crearMarkerUser(message);
    
                }
              }
          } 
    });

    myDataRef.on("child_changed", function(snapshot) {
        var message = snapshot.val();

          if(message.empresa==empresaUser){

            //puede ver todos los equipos (administrador)
              if(rolUSer==1){

                 crearMarkerUser(message);
              
              }

            //puede ver su equipo y tiene menos funcionalidades (asesor)
              if(rolUSer==2){
                if(message.equipo == equipoUSer){

                    crearMarkerUser(message);
    
                }
              }
            //puede ver a su equipo y usar todas las funcionalidades
              if(rolUSer==3){
                if(message.equipo == equipoUSer){

                    crearMarkerUser(message);
    
                }
              }
          }  

    });
    //**FIN CARGAR USUARIOS CON FIREBASE**

//**MOVIMIENTO MARKER USUARIOS**
    /* Returns true if the two inputted coordinates are approximately equivalent */
    function coordinatesAreEquivalent(coord1, coord2) {
        return (Math.abs(coord1 - coord2) < 0.000001);
    }
    /* Animates the Marker class (based on https://stackoverflow.com/a/10906464) */
    google.maps.Marker.prototype.animatedMoveTo = function(lat, lng, id) {

        var toLat = lat;
        var toLng = lng;

        var fromLat = marks[id].getPosition().lat();
        var fromLng = marks[id].getPosition().lng();

        if (!coordinatesAreEquivalent(fromLat, toLat) || !coordinatesAreEquivalent(fromLng, toLng)) {
            var percent = 0;
            var latDistance = toLat - fromLat;
            var lngDistance = toLng - fromLng;
            var interval = window.setInterval(function () {
                percent += 0.01;
                var curLat = fromLat + (percent * latDistance);
                var curLng = fromLng + (percent * lngDistance);
                var pos = new google.maps.LatLng(curLat, curLng);
                this.setPosition(pos);
                if (percent >= 1) {
                    window.clearInterval(interval);
                }
            }.bind(this), 10);
        }
    };
    //**FIN MOVIMIENTO MARKER USUARIOS**
///
///
///
}

function crearMarkerUser(message){

              if(message.online == 0){
                  var ic = "/img/markerCoordinate.png";
              }
              if(message.online == 1){
                  var ic = "/img/markerCoordinate4.png";
              }
                  var poslatlng = new google.maps.LatLng(message.lat, message.lng);


                    var marker = new google.maps.Marker({
                        position: poslatlng,
                        map: map,
                        title: message.nombre,
                        icon: ic
                    });   

              bounds.extend(poslatlng);
              map.fitBounds(bounds);
              if(map.getZoom() > 18){
                  map.setZoom(18);
              }


              var contentString ="<IMG SRC=\""+message.foto+"\" WIDTH=30 HEIGHT=30 BORDER=0> "+message.nombre;
                  contentString +="<br>Ultima conexion: "+message.hora+" - "+message.fecha;
               
              marks[message.id] = marker;   

              marks[message.id].infowindow = new google.maps.InfoWindow({
                  content:contentString
              });

              marks[message.id].infowindow.open(map,marks[message.id]);

              google.maps.event.addListener(marks[message.id], 'click', function() {
                  marks[message.id].infowindow.open(map, marks[message.id]);
              });


             //para ruta
             arrRuta[message.id]  = {
                  posicion: poslatlng,            
              };

            //para equipos
            equipos[zIdUSer]  = {
                      posicion: poslatlng,
                      id: message.id,
                      equipo: message.equipo
            };

            //para posicion
            idUSer[zIdUSer]  = {
                  posicion: poslatlng,
                  id: message.id,
                  equipo: message.equipo            
            };
            
            var myDataRef = new Firebase('https://geo-coordinate.firebaseio.com/posicion_actual');

            // var usersRef = myDataRef.child(message.id);
            // usersRef.update({
            //      pos: zIdUSer++
            //  });

             zIdUSer++;
          
}
function changeMarkerUser(message){

            if(message.online == 0){
                var ic = "/img/markerCoordinate.png";
                marks[message.id].setIcon(ic);
            }
            if(message.online == 1){

                 var ic = "/img/markerCoordinate4.png";
                 marks[message.id].setIcon(ic);        
            }
            
            marks[message.id].animatedMoveTo(message.lat, message.lng, message.id);

            contentString ="<IMG SRC=\""+message.foto+"\" WIDTH=30 HEIGHT=30 BORDER=0> "+message.nombre;
            contentString +="<br>Ultima conexion: "+message.hora+" - "+message.fecha;

            marks[message.id].infowindow.setContent(contentString);

            var poslatlng = new google.maps.LatLng(message.lat, message.lng);
            
             arrRuta[message.id]  = {
                  posicion: poslatlng,
             };

      
              idUSer[message.pos]  = {
                    posicion: poslatlng,
                    id: message.id
              };  
}

function firebaseUser(index){

      if(index==0){
            for(var z=0; z<equipos.length; z++){
                  marks[equipos[z].id].setVisible(true);
                  marks[equipos[z].id].infowindow.open(map,marks[equipos[z].id]);
            }
      }else{
          for(var z=0; z<equipos.length; z++){
             
             if(equipos[z].equipo != index){
                marks[equipos[z].id].setVisible(false);
                marks[equipos[z].id].infowindow.close();
             }else{
                marks[equipos[z].id].setVisible(true);
                marks[equipos[z].id].infowindow.open(map,marks[equipos[z].id]);
             }          
          }
      }
}



/******MENU********/
//var arrMenu =[];
function gs_menus() {
    urlmod='require/getmenu';
    path="";
    $.ajax({url:urlmod,
            data:path,
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data){
            if (data.status == "OK"){
               $.each( data.result, function(i,menu)
                    {
                        var content="";
                        var content2="";

                        content += "<li><a class='tooltipped grey-text "+menu.classMenu+" waves-effect waves-orange' data-tooltip='"+menu.nombreMenu+"' onclick='loadmodulo(\""+menu.classMenu+"\", \""+menu.carpetaFuncion+"\", \""+i+"\");' ><i class='"+menu.iconoMenu+"'></i></a></li>";
                        content2 += "<li class='bold'><a class='collapsible-header  waves-effect waves-orange "+menu.classMenu+"' onclick='loadmodulo(\""+menu.classMenu+"\", \""+menu.carpetaFuncion+"\", \""+i+"\");'><i class="+menu.iconoMenu+"></i> "+menu.nombreMenu+"</a></li>";

                          // arrMenu[i] = {
                          //     classMenu: menu.classMenu,
                          //     phpFile: menu.phpFileInclude,
                          //     classNum: "0",
                          //     carpeta: menu.carpetaFuncion
                          // };
                        $(".menuRight").prepend(content); 
                        $(".menuLateral").prepend(content2); 
                    });
                 $('.tooltipped').tooltip({delay: 1});
                }
                else
                { alert("error menu respuesta");}
            }
      }); 
}

function loadmodulo(obj,obj2, n){
    
    urlmod="modulo/vendedores/"+obj2+"/";

    $( ".cargar"+n).load( urlmod );

    $("."+obj).removeAttr("onclick");
    
} 

function getEquipos(){

        urlmod='modulo/vendedores/php/getEquipos.php';
        $.ajax({url:urlmod,
                data:'&callback=?',
                type: "GET",
                dataType: "jsonp",
                //  async: true,
            success: function(data){
              if (data.status == "OK"){
                  var ctn = "";
                  
                 $.each( data.result, function(i,job){

                      ctn +=   "<li class='divider'></li>";
                      ctn +=   "<li><a onclick='firebaseUser("+job.idEquipo+")'>"+job.nombreEquipo+"</a></li>";

                  });
                    $( ".eq").prepend( ctn );

              }
              else{ alert("error");}
            }
      }); 
}