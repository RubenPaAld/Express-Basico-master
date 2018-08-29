var socket = io();

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('perdida la conexion con el servidor');
});

//Enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ',resp);
});

//Escuchar informacion
socket.on('enviarMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);
});