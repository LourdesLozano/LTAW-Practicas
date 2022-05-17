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

const FORMULARIO = fs.readFileSync('login.html');
const TIENDA = fs.readFileSync('tienda.html');
const RESPUESTA = fs.readFileSync('login_res.html');
const TIENDA_JSON = fs.readFileSync('tienda.json');
const tiendaJson = JSON.parse(TIENDA_JSON);
const ERROR = fs.readFileSync('error.html');

let contenido;
//-- Mensaje de arranque
console.log("Arrancando servidor...");


let users_reg = [];
console.log("Lista de usuarios registrados");
console.log("-----------------------------");
tiendaJson["usuarios"].forEach((element, index)=>{
    console.log("Usuario " + (index + 1) + ": " + element.user);
    users_reg.push(element.user);
});



function getUser(req){

    //-- Leer las cookies
    const cookie = req.headers.cookie;

    if (cookie) {
        console.log("Cookie: " + cookie);

        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        let usuario;
        pares.forEach((element, index) => {
    
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');

            //-- Leer el usuario
            //-- Solo si es 'usuario'
            if (nombre.trim() === 'usuario') {
                usuario = valor;
            }
        });
        console.log('Usuario: ', usuario);
    } else {
        console.log('No hay cookie'); 
    }
}

//-- Crear el sevidor
const server = http.createServer(function (req, res) {
    
    //-- Url que pide el cliente
    const myUrl = new URL(req.url, 'http://' + req.headers['host']);
    console.log("\nRecurso recibido: " + myUrl.pathname);

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
    
    let filename = ""
    //let filename = myUrl.pathname;

    // -- Buscamos el "." final para poder indicar que tipo mine es
    let hastaPunto = myUrl.pathname.lastIndexOf(".");
    let type = myUrl.pathname.slice(hastaPunto + 1);
    console.log("Tipo de mine:", mine[type])

    //-- Respuesta por defecto
    let code = 200;
    let message = "OK";

    //-- Obtenemos el fichero correspondiente.
    if(myUrl.pathname == '/'){
        filename += "./tienda.html"; //-- Página principal de la tienda
        getUser(req);

    } else if (myUrl.pathname == '/login'){
        let nombre = myUrl.searchParams.get('nombre');
        let user = myUrl.searchParams.get('usuario');
        let correo = myUrl.searchParams.get('correo');
        

        console.log(" Usuario----> " + user);
        console.log(" Correo----> " + correo);
        res.setHeader('Set-Cookie', "user = "+ user);
        
        let informacion = JSON.parse(TIENDA_JSON);
        
        let user1 = informacion['usuarios'][0]['usuario'];
        let correo1 = informacion['usuarios'][0]['correo'];
        let user2 = informacion['usuarios'][1]['usuario'];
        let correo2 = informacion['usuarios'][1]['correo'];

        contenido = RESPUESTA;
        

        if (user == user1 && correo == correo1) {
            console.log("Coincide");
            
            filename += "./login_res.html"
            mine[type]= "text/html";
        
        } else if (user == user2 && correo == correo2) {
            console.log("Coincide");
         
            mine[type]= "text/html";
        
        }else{
            filename += "./error.html" 
            //contenido = ERROR;
            mine[type]= "text/html";
        }

    }else{
        filename += "." + myUrl.pathname;
    }

    console.log("Filename:", filename);

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

