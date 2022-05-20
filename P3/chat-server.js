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


//-- Directorio público 
app.use(express.static('public'));

//-- Websockets
io.on('connection', (socket) => {
  
    //-- Nuevo usuario  
    console.log('-- ¡ALERTA! NUEVA MARUJA --'.pink);
    connect_count += 1;
    socket.send(welcome);
    socket.broadcast.emit('message', usuario); 

  
});

//-- Lanzar el server
server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);