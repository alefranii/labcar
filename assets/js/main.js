

/***************** navbar scroll***********************/

function cambioDeNavbar() {
    var distanciaY = window.pageYOffset || document.documentElement.scrollTop;
    var navbar = document.getElementById('navbar');
    var logo = document.getElementById('logo');
    var botonSignUp = document.getElementById('btn-sign-up');

    if (distanciaY > 100) {
        navbar.classList.add('navbar-color');
        logo.setAttribute('src', 'assets/img/logo.png');
        /*botonSignUp.style.visibility = 'visible';*/

    } else {
        navbar.classList.remove('navbar-color');
        logo.setAttribute('src', 'assets/img/logo.png');
        botonSignUp.style.visibility = 'hidden';
    }
}
window.addEventListener('scroll', cambioDeNavbar);


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