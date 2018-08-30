const {io} = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicacion'
    });

    client.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    client.on('siguienteTicket',(data,callback) => {
        callback(ticketControl.siguiente());
        client.broadcast.emit('estadoActual',{
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUtlimos4()
        });
    });

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUtlimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio)
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            });

        const resp = ticketControl.atenderTicket(data.escritorio);

        callback(resp);

        if (resp.numero)
            client.broadcast.emit('ultimos4',{
                ultimos4: ticketControl.getUtlimos4()
            });
    });

});