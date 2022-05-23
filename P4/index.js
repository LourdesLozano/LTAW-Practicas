const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const usuarios_conect = document.getElementById("usuarios_conect");

//-- Acceder a la API de node para obtener la info
info1.textContent = process.versions.node;
info2.textContent = process.versions.electron;
info3.textContent = process.versions.chrome;
info4.textContent = process.cwd();
usuarios_conect.innerHTML = 0;

electron.ipcRenderer.on('ip', (event, msg) => {
    console.log("Recibido: " + msg);
    info4.textContent = msg;
});
