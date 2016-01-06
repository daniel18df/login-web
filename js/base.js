//VARIABLES GLOBALES
var cont1=0, cont2=0, cont3=0, cont4=0, cont5=0;
var mailGraficos=" ";



//VARIABLES GLOBALES

//METODOS GLOBALES
var qwerty=0;
function userMonitoreado(id){

    if(qwerty !== 0)
    if(id !== qwerty)
    marks[qwerty].setIcon("/img/markerCoordinate.png");


    marks[id].setIcon("/img/markerCoordinateMonitoreo.png");

    qwerty = id;
}


function ver_marker_seleccionado(lat, lng){

    var poslatlng = new google.maps.LatLng(lat, lng);

    map.setCenter(poslatlng);
    map.setZoom(21);
    // bounds.extend(poslatlng);
    // map.fitBounds(bounds);

}  

function clearMarkersTareas(arr) {

    for (var i = 0; i < arr.length; i++) {
        arr[i].setMap(null);
    }
}

//METODOS GLOBALES