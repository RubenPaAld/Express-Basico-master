//comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
   console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('desconetado del servidor');
});

socket.on('estadoActual', function (resp) {
    label.text(resp.actual);
});

$('button').on('click',function () {
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
});