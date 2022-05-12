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

const RESPUESTA = fs.readFileSync('login.html', 'utf-8');
const TIENDA_JSON = fs.readFileSync('tienda.json','utf-8');

//-- Mensaje de arranque
console.log("Arrancando servidor...");


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

    }else if(myUrl.pathname == '/login'){
        let nombre = myUrl.searchParams.get('nombre');
        let usuario = myUrl.searchParams.get('usuario');
        let correo = myUrl.searchParams.get('correo');
        console.log(" Nombre---------> " + nombre);
        console.log(" Usuario----> " + usuario);
        console.log(" Correo----> " + correo);
        res.setHeader('Set-Cookie', "user = "+ usuario);
        
        let informacion = JSON.parse(TIENDA_JSON);
        //info_usuarios = informacion["usuarios"][0];
        //-- Mostrar informacion sobre la tienda
       // console.log("Productos en la tienda: " + info_usuarios);
        console.log(informacion);
        console.log(informacion['usuarios']);
        informacion["usuarios"].forEach((element, index)=>{
            console.log("Usuario registrado: " + (index + 1) + ": " + element["nombre"]+"/"+ element["user"]+"/"+ element["correo"]);
            filename += "./login.html"

            if (correo==element["correo"] && usuario==element["usuario"]) {
                console.log("Coincide");
            
                // Reemplazamos las palabras
                filename += "./login.html".replace("NOMBRE", nombre);
                filename += content.replace("USUARIO", usuario);
                filename += content.replace("CORREO", correo);
                mine[type]= "text/html";
            }else{
                filename += "./error.html" 
                mine[type]= "text/html";
            }

        });
    
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

