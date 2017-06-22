/***************** expandir modal ***********************/
var presPhoneNumber = document.getElementById('phone-number');
presPhoneNumber.addEventListener('click', desplegarFormulario);

function desplegarFormulario() {
    var phoneNumber = document.getElementById('phone-number');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var city = document.getElementById('city');
    name.classList.remove('ocultar-input');
    email.classList.remove('ocultar-input');
    city.classList.remove('ocultar-input');

    var container = document.getElementById('container');
    container.classList.add('extended-card');
}

function ocultarFormulario() {
    var container = document.getElementById('container');
    container.classList.remove('extended-card');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var city = document.getElementById('city');
    name.classList.add('ocultar-input');
    email.classList.add('ocultar-input');
    city.classList.add('ocultar-input');
}

/****************************** Validaciones codigo reutilizado ***********************************/

function validarTelefono(value) {
    return !(isNaN(parseInt(value)));
}

function primeraMayus(value) {
    if (value[0] === value[0].toUpperCase()) {
        return true;
    }
}

function validarCorreo(email) {
    var expRegCorreo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!expRegCorreo.test(email)) {
        return true;
    }
}

function soloLetras(value) {
    return (isNaN(parseInt(value)));
}

function limpiarForm() {
    var phoneNumber = document.getElementById('phone-number').value = '';
    var name = document.getElementById('name').value = '';
    var email = document.getElementById('email').value = '';
    var city = document.getElementById('city').value = '';
}

var botonBecome = document.getElementById('btn-become');
botonBecome.addEventListener('click', validaciones);

function validaciones() {
    var phoneNumber = document.getElementById('phone-number');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var city = document.getElementById('city');
    var container = document.getElementById('container');
    if (Array.from(container.classList).indexOf('extended-card') === -1) {
        desplegarFormulario();
        return null;
    }

    if (phoneNumber.value === '') {
        phoneNumber.classList.add('invalid-input')
    }
    if (name.value === '') {
        name.classList.add('invalid-input')
    }
    if (email.value === '') {
        email.classList.add('invalid-input')
    }
    if (city.value === '') {
        city.classList.add('invalid-input')
    }
    if (!validarTelefono(phoneNumber.value)) {
        phoneNumber.classList.add('invalid-input');
    } else {
        phoneNumber.classList.remove('invalid-input');
    }

    if (!primeraMayus(name.value) || !soloLetras(name.value)) {
        name.classList.add('invalid-input');
    } else {
        name.classList.remove('invalid-input');
    }

    if (validarCorreo(email.value)) {
        email.classList.add('invalid-input');
    } else {
        email.classList.remove('invalid-input');
    }

    if (!primeraMayus(city.value)) {
        city.classList.add('invalid-input');
    } else {
        city.classList.remove('invalid-input');
    }

    // Si todo esta correcto vaciamos el formulario y volvemos a la card original
    //validarTelefono(phoneNumber.value) && (!primeraMayus(name.value) || !soloLetras(name.value)) && !validarCorreo(email.value) && !primeraMayus(city.value)
    if (validarTelefono(phoneNumber.value) &&
        (primeraMayus(name.value) || soloLetras(name.value)) &&
        !validarCorreo(email.value) &&
        primeraMayus(city.value)
        ) {
        limpiarForm();
    alert('Ya esta registrado, revise su correo');
    ocultarFormulario();
}
}



/***************** mapa***********************/

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: -9.1191427, lng: -77.0349046},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
});

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
  }
}

document.getElementById('encuentrame').addEventListener("click", buscar);
var latitud, longitud;
var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
  });
    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
}
var funcionError = function (error){
    alert("Tenemos un problema con econtrar tu ubicación");
}

var start = document.getElementById('origen');
var end = document.getElementById('destino');

new google.maps.places.Autocomplete(start);
new google.maps.places.Autocomplete(end);

var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;

var calcularRuta = function(directionsService,directionsDisplay){
    directionsService.route({
        origin: start.value,
        destination: end.value,
        travelMode: 'DRIVING'
    }, function (response,status){
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        }else{
            window.alert(" oh No! No encontramos tu ruta");
        }
    });
}

directionsDisplay.setMap(map);
var trazarRuta = function(){
    calcularRuta(directionsService,directionsDisplay);
};

document.getElementById("ruta").addEventListener('click', trazarRuta);
};
