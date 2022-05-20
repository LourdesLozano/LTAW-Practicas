const http = require('http');
const express = require('express');
const socket = require('socket.io');
const colors = require('colors');

const PUERTO = 9090;

const commandos = 'Comandos: /help, /list, /hello y /date';
const welcome = 'Bienvenidooo';
const bye = '¡Adiós!';
const hello = 'Informacion disponible';
const usuario = 'Nuevo usuario';

//-- Server
const app = express();
const server = http.Server(app);
const io = socket(server);

let connect_count = 0;

//-- Entrada web
app.get('/', (req, res) => {
    let path = __dirname + '/chat.html';
    res.sendFile(path);
    console.log("Acceso a " + path);
});

app.use('/', express.static(__dirname +'/'));


//-- Websockets
io.on('connection', (socket) => {
  
    //-- Nuevo usuario  
    console.log('-- Nuevo usuario --'.pink);
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

    const date = new Date(Date.now());

    if (msg.startsWith('/')) {
      console.log('Comandos'.blue);
      switch(msg){
        case '/help':
          console.log('Lista de comandos'.blue);
          socket.send(commandos);
          break;
        case '/list':
          console.log('Lista de usuarios'.blue);
          socket.send('Hay un total de ' + connect_count + ' marujas en la ciudad.');
          break;
        case '/hello':
          console.log('Holi'.blue);
          socket.send(hello);
          break;
       
      }
    } else {
      io.send(msg);
    }; 
  });
});

//-- Lanzar el server
server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);