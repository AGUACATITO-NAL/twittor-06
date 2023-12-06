// Validando si la página se está desplegando desde producción o desarrollo
var url = window.location.href; // Corregir "ubication" a "location"
var swLocation = '/twittor/sw.js';

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register(swLocation).then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration);
    }).catch(function(error) {
        console.error('Error al registrar el Service Worker:', error);
    });
}

// Referencias de jQuery
var titulo = $('#titulo');
var nuevoBtn = $('#nuevo-btn');
var salirBtn = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn = $('#post-btn');
var avatarSel = $('#seleccion');
var timeline = $('#timeline');

var modal = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns = $('.seleccion-avatar');
var txtMensaje = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario;

// ===== Codigo de la aplicación
function crearMensajeHTML(mensaje, personaje) {
    var li = document.createElement('li');
    li.className = 'animated fadeIn fast';

    var content = `
        <div class="avatar">
            <img src="img/avatars/${personaje}.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${personaje}</h3>
                <br/>
                ${mensaje}
            </div>
            <div class="arrow"></div>
        </div>
    `;

    li.innerHTML = content;
    timeline.prepend(li);
    cancelarBtn.click();
}

// Globals
function logIn(ingreso) {
    if (ingreso) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');
        titulo.text('Seleccione Personaje');
    }
}

// Seleccion de personaje
avatarBtns.on('click', function() {
    usuario = $(this).data('user');
    titulo.text('@' + usuario);
    logIn(true);
});

// Boton de salir
salirBtn.on('click', function() {
    logIn(false);
});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {
    modal.removeClass('oculto');
    modal.animate({
        marginTop: '-=1000px',
        opacity: 1
    }, 200);
});

// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
    modal.animate({
        marginTop: '+=1000px',
        opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

// Boton de enviar mensaje
postBtn.on('click', function() {
    var mensaje = txtMensaje.val().trim(); // Eliminar espacios en blanco al principio y al final
    if (!mensaje) {
        cancelarBtn.click();
        return;
    }
    crearMensajeHTML(mensaje, usuario);
});

// Asegurar el orden de ejecución después de que el documento HTML ha cargado completamente
$(document).ready(function() {
    // Tu código jQuery aquí
});
