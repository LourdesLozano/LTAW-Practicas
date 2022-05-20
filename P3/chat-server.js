const http = require('http');
const express = require('express');
const socket = require('socket.io');
const colors = require('colors');

const PUERTO = 9090;


const welcome = 'Biwnvenidooooo';
const bye = '¡Adiós!';
const usuario = 'Usuario nuevo';


//-- Server
const app = express();
const server = http.Server(app);
const io = socket(server);


//-- Entrada web
app.get('/', (req, res) => {
    console.log("eeeee");
    let path = __dirname + '/chat.html';
    res.sendFile(path);
});

app.use('/', express.static(__dirname +'/'));

//-- Directorio público 
app.use(express.static('public'));

//-- Websockets
io.on('connection', (socket) => {
  
    //-- Nuevo usuario  
    console.log('-- Nuevo user--'.pink);
    connect_count += 1;
    socket.send(welcome);
    socket.broadcast.emit('message', usuario);

    //-- Desconexión
    socket.on('disconnect', function(){
    console.log('-- FIN CONEXIÓN --'.pink);
    socket.broadcast.emit('message', bye);
    connect_count -= 1;
  });  

  //-- Mensaje a todos los usuarios
  socket.on("message", (msg)=> {
    console.log('Mensaje: ' + msg.yellow);

    
    
   
  });
});

//-- Lanzar el server
server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);