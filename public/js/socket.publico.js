const socket = io();

const lblTickets = [];
const lblEscritorios = [];

lblTickets[0] = $('#lblTicket1');
lblTickets[1] = $('#lblTicket2');
lblTickets[2] = $('#lblTicket3');
lblTickets[3] = $('#lblTicket4');

lblEscritorios[0] = $('#lblEscritorio1');
lblEscritorios[1] = $('#lblEscritorio2');
lblEscritorios[2] = $('#lblEscritorio3');
lblEscritorios[3] = $('#lblEscritorio4');


socket.on('estadoActual', function (data) {
    //console.log(data);
    console.log('recibiendo informaicon');
    actualizarHtml(data.ultimos4);
});

socket.on('ultimos4', function (data) {

    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(data.ultimos4);
});

function actualizarHtml(ultimos4) {

    for (var i = 0; i < ultimos4.length; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}