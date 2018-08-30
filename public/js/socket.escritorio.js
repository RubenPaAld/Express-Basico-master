//comando para establecer la conexion
const socket = io();

const seachParams = new URLSearchParams(window.location.search);

if(!seachParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const label = $('small');
const escritorio = seachParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function () {

    socket.emit('atenderTicket',{

        escritorio: escritorio

    },function (resp) {

        if (!resp.numero) {
            alert('No hay mas tickets');
            label.text(resp);
        } else {
            label.text('Ticket ' + resp.numero);
        }
    })
});

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('desconetado del servidor');
});