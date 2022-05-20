//-- Cuadrados chat
const display = document.getElementById('display');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');
const user = document.getElementById("user");


//-- Conexión con el server
const socket = io();

let newUser = 'usuario';


//-- Mensaje recibido
socket.on('message', (msg) =>{
    display.innerHTML += '<p>' + ' > ' + msg + '</p>';
});

//-- Envío de mensaje al pulsar enviar
enviar.onclick = () => {
    if (mensaje.value){
        socket.send(mensaje.value);
        console.log('Mensaje enviado');
      
    }
    //-- Borrar mensaje
    mensaje.value = "";
}

//-- Envío del mensaje al pulsar enter
mensaje.onchange = () => {
    if (mensaje.value){
        socket.send(newUser + ': ' + mensaje.value);
        console.log('Mensaje enviado');
    }
    //-- Borrar mensaje
    mensaje.value = "";
}

// nickname
//Cuando se introduce nombre usuario
user.onchange = () => {
    if(user.value){
        newUser = user.value;
    }
};
