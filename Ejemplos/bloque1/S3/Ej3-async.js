const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

// SITUACION 1 --------------------------------------------------
// --- Prrimero se arranca el servidor y sale el menaje E
//      servidor modo escucha y sale mensaje F

// --- recibimos mensaje de solucitud y se va  ala funcion de retrollamada
//      sale mensaje A
//      sale mensaje D

// --- Termina funcion de retrollamada
//      llega evento end 
//      sale mensaje C

// terminal: node ...
// otro temrinal: curl "127.0.0.1:8080"


// SITUACION 2 --------------------------------------------------
// --- Prrimero se arranca el servidor y sale el menaje E
//      servidor modo escucha y sale mensaje F

// --- recibimos mensaje de solucitud y se va  ala funcion de retrollamada
//      sale mensaje A
//      sale mensaje D
//      sale mensaje A

//      llega evento "data"
//      sale mensaje B
//      sale mensaje A

//      Llega el evento "end"
//      sale mensaje A
//      sale mensaje C

// terminal: node ...
// otro temrinal: curl -d "holaaaa..." "127.0.0.1:8080"