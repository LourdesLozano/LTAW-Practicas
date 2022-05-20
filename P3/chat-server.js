const http = require('http');
const express = require('express');
const socket = require('socket.io');
const colors = require('colors');

const app = express();
const server = http.Server(app);
const io = socket(server);

const PUERTO = 9090;

//-- Constantes chat
const welcome = '¡BIENVENIDO AL CHAT!';
const usuario = 'Alguien nuevo quiere cotillear';


app.get('/', (req, res) => {
    let path = __dirname + '/chat.html';
    res.sendFile(path);
});
app.use('/', express.static(__dirname +'/'));
//-- Directorio público 
app.use(express.static('public'));

//-- Websockets
io.on('connection', (socket) => {
  
    //-- Nuevo usuario  
    console.log('-- ¡Nuevo usuario --'.pink);
    connect_count += 1;
    socket.send(welcome);
    socket.broadcast.emit('message', usuario); 

    //-- Se va usuario
    socket.on('disconnect', function(){
        console.log('-- FIN CONEXIÓN --'.pink);
        socket.broadcast.emit('message', bye);
        connect_count -= 1;
    });

  
});

//-- Lanzar el server
server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);