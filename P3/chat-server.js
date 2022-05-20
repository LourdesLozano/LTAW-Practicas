const http = require('http');
const express = require('express');
const socket = require('socket.io');
const colors = require('colors');

const PUERTO = 9090;

const commandos = 'Los comandos disponibles son: /help, /list, /hello y /date';
const welcome = '-- Bienvenido';
const bye = '¡Adiós!';
const hello = 'Holaaaaaa';
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
    console.log("Acceso al chat");
});

app.use('/', express.static(__dirname +'/'));


//-- Websockets
io.on('connection', (socket) => {
  
    //-- Nuevo usuario  
    console.log('-- Nuevo usuario--'.pink);
    connect_count += 1;
    socket.send(welcome);
    io.send(usuario);

    //-- Desconexión
    socket.on('disconnect', function(){
        console.log('-- FIN CONEXIÓN --'.pink);
        io.send(bye);
        connect_count -= 1;
    });  

    //-- Mensaje a todos los usuarios
    socket.on("message", (msg)=> {
        console.log('Mensaje: ' + msg.pink);

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
            socket.send('totla de usuarios ' + connect_count);
            break;
            case '/hello':
            console.log('Holi'.blue);
            socket.send(hello);
            break;
            case '/date':
            console.log('Fecha'.blue);
            socket.send(date);
            break;
            default:
            console.log('Not Found'.blue);
            socket.send('Comando no reconocido. Los comandos están en /help');
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