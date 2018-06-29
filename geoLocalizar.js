function initMap(latitud, longitud) {
    var myLatLng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 10
    });

    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });
}

//geolocalizacion
function localizarUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (objPosition) {
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;

            var latlng = new google.maps.LatLng(lat, lon);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "latLng": latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $("#inputCiudad").val(results[2].formatted_address + "");
                        $("#btBuscar").text("Lozalizando...")
                        consultarCiudad(results[2].formatted_address);
                    }
                    else {
                        alert("Direccion no encontrada")
                    }
                }
                else {
                    alert("Debes aceptar los permisos de geolocalización")
                }
            });
        }, function (objPositionError) {
            switch (objPositionError.code) {
                case objPositionError.PERMISSION_DENIED:
                alert("No se ha permitido el acceso a la posición del usuario.");
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                alert("No se ha podido acceder a la información de su posición.");
                    break;
                case objPositionError.TIMEOUT:
                    alert("El servicio ha tardado demasiado tiempo en responder.");
                    break;
                default:
                alert("Error desconocido.");
            }
        }, {
                maximumAge: 75000,
                timeout: 15000
            });
    }
    else {
        content.innerHTML = "Su navegador no soporta la API de geolocalización.";
    }
};
//fin de geolocalizacion