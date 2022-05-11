// servidor debe esccuhar en puerto 9090
// si hay recurso no disponible --> genera página html de error

// --- FRONT END
// página principal con 3 productos diferentes con imagem y enlace propia

// 1. para lanzar servidor: node tienda.js
// 2. abrir navegador: http://localhost:9090 o 127.0.0.1:9090

// -- el servidor de mi tienda

// fichero html 
// ficheros con img
// ficheros css
// devolver fichero pedido

// -- PRACTICA 2: Practica 1 con añadidos
//-- Importamos los modulos http, fs y url
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Definir el puerto a utilizar
const port = 9090;

//-- Mensaje de arranque
console.log("Arrancando servidor...");

// ------------------------------------------------

//const tienda = JSON.parse(fs.readFileSync("tienda.json"));
//const TIENDA = fs.readFileSync('tienda.html');
const LOGIN = fs.readFileSync('login.html');


//-- Cargar pagina web del formulario
const formulario = fs.readFileSync('login.html','utf-8');
const error = fs.readFileSync('error.html');
const tienda = fs.readFileSync('tienda.html','utf-8');
const tiendaJSON = fs.readFileSync('tienda.json','utf-8');
let usuarios = tiendaJSON[0]['usuarios'];

let contenido;




function getUser(req){
    const cookie = req.headers.cookie;
    if(cookie) {
        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        //-- Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');
            //-- Leer el usuario
            //-- Solo si el nombre es 'usuario'
            if (nombre.trim() === 'usuario') {
                usuario = valor;
            }
        });
    } else {
        console.log("No hay cookie");
    }
}


// -----------------------------------------------

//-- Crear el sevidor
const server = http.createServer(function (req, res) {
    
    let myUrl = new URL(req.url, 'http://' + req.headers['host']);
    let filename = ""
    let myUser = getUser(req);
    let nombre = myURL.searchParams.get('usuario');
    let correo = myURL.searchParams.get('correo');
    
    //-- Coger la extensión
    type_file = filename.split(".")[1]; 
    filename = "." + filename;
    

    console.log("\nRecurso recibido: " + myUrl.pathname);
    console.log("\nMetodo recibido: " + myUrl.method);
    console.log("\nUrl recibida: " + myUrl.url);
    console.log("\nParametros recibido: " + myUrl.searchParams);

    //-- Escribir en consola la ruta de nuestro recurso
    console.log("---> Peticion Recibida: " + myUrl);

    var mine = {
        '/'    : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jfif' : 'image/jfif',
        'png'  : 'image/png',
        'gif'  : 'image/gif',
        'jpg'  : 'image/jpg',
        'js'   : 'text/js',
        'TTF'  : 'text/TTF',
        'otf'  : 'text/otf',
        'webp' : 'image/webp',
        'json' : 'application/json'
    };

    //////////////////////////////////////////////////////////////////////////
    
    

    //-- Obtenemos el fichero correspondiente.
    if(myUrl.pathname == '/'){
        filename += "./tienda.html"; //-- Página principal de la tienda

    }else{
        filename += "." + myUrl.pathname;
    }

    console.log("Filename:", filename);
    ////////////////////////////////////////////////////////////////////////////

    // -- Buscamos el "." final para poder indicar que tipo mine es
    let hastaPunto = myUrl.pathname.lastIndexOf(".");
    let type = myUrl.pathname.slice(hastaPunto + 1);
    console.log("Tipo de mine:", mine[type])


    



    if ((myURL.pathname == '/') || (filename == 'login.html')){ 
        if (myUser){
          contenido = TIENDA; 
        } else {
          contenido = LOGIN;
        }
        //-- filename += "/tienda.html"; 
    } else if (myURL.pathname == '/procesar') {
        if (registrados.includes(nombre)){
          res.setHeader('Set-Cookie', "user =" + nombre);
          //contenido = LOGIN_CORRECTO;
          console.log('- Usuario registrado -');
        } else{
          filename = 'error.html';
        }
    }

    //-- Respuesta por defecto
    let code = 200;
    let message = "OK";

    //-- Leemos fichero
    fs.readFile(filename, function(err, data) {

        //si hay error
        if ((err || (filename == 'error.html'))) {
            // fichero de error
            code = 404
            message = "Not Found"
            data = fs.readFileSync('./error.html')
            res.writeHead(code, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        //si no hay error
        }else{
            res.statusCode = code; 
            res.statusMessage = message;
            res.writeHead(code, {'Content-Type': mine[type]});
            res.write(data);
            res.end();
        }

    });




    

});

//-- Activar el servidor
server.listen(port);

//-- Mensaje de inicio
console.log("Server esta activo. \nEscuchando en puerto: " + port);

