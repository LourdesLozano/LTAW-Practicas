//-- Cuadrados chat
const display = document.getElementById('display');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');
const user = document.getElementById("user");
const audio = new Audio('espada.mp3');
const texto = document.getElementById('texto');

let newUser = 'Usuario';
let escribiendo = false;


//-- Conexión con el server
const socket = io();


//-- Mensaje recibido
socket.on('message', (msg) =>{
    display.innerHTML += '<p>' +  msg + '</p>';
});


//-- Envío de mensaje al pulsar enviar
enviar.onclick = () => {
    if (mensaje.value){
        socket.send('<img src="icono.png" /> ' + newUser +  ': ' + mensaje.value);
        console.log('Mensaje enviado');
        audio.play();
        escribiendo = false;
      
    }
    //-- Borrar mensaje
    mensaje.value = "";
}

//-- Envío del mensaje al pulsar enter
mensaje.onchange = () => {
    if (mensaje.value){
        socket.send('<img src="icono.png" /> ' + newUser + ': ' + mensaje.value);
        console.log('Mensaje enviado');
        audio.play();
        escribiendo = false;
        
    }
    //-- Borrar mensaje
    mensaje.value = "";
}

mensaje.oninput = () => {
    if(!escribiendo){
        escribiendo = true;
        texto.innerHTML += '>>>> ' + newUser + 'está escribiendo...';
    };
};

user.onchange = () => {
    if(user.value){
      newUser = user.value;
    }
};

