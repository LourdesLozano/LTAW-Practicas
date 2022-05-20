

const display = document.getElementById('display');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');


const socket = io();


//-- Mensaje recibido
socket.on('message', (msg) =>{
    display.innerHTML += '<p>' + ' --> ' + msg + '</p>';
    console.log("escribeee....??");
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
        socket.send(mensaje.value);
        console.log('Mensaje enviado');
    }
    //-- Borrar mensaje
    mensaje.value = "";
}
