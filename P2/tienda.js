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
const fs = require('fs');
const port = 9090;


const FORMULARIO = fs.readFileSync('login.html','utf-8');
const RESPUESTA = fs.readFileSync('login_res.html', 'utf-8');
const ERROR = fs.readFileSync('error.html');
const MAIN = fs.readFileSync('tienda.html','utf-8');

const TIENDA_JSON = fs.readFileSync('tienda.json','utf-8');

//-- Mensaje de arranque
console.log("Arrancando servidor...");

function get_cookie(req){

    //-- Leer las cookies
    const cookie = req.headers.cookie;

    if (cookie) {
        console.log("Cookie: " + cookie);

        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        let user;
        pares.forEach((element, index) => {
    
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');

            //-- Leer el usuario
            //-- Solo si el nombre es 'user'
            if (nombre.trim() === 'user') {
                user = valor;
            }
        });
     
    } else {
        console.log('No hay cookie');
    }
}


//-- Crear el sevidor
const server = http.createServer((req, res) => { 

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
    console.log("\nRecurso recibido: " + myURL.pathname);

    //-- Leer recurso y eliminar la / inicial
   
    var mime = {
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
    
    let hastaPunto = myURL.pathname.lastIndexOf(".");
    let type = myURL.pathname.slice(hastaPunto+1);
    
    let filename = myURL.pathname;
    filename = filename.substr(1); 

    switch (filename) {
        case '':
            content = MAIN;
            get_cookie(req);
            break;

            case 'login':
                //-- Leer los parámetros
                let nombre = myURL.searchParams.get('nombre');
                let usuario = myURL.searchParams.get('usuario');
                let correo = myURL.searchParams.get('correo');
                console.log("\nRecurso recibido: " + myURL.pathname);
    
                //-- Obtener el array de productos
                //-- Crear la estructura tienda a partir del contenido del fichero
                let info = JSON.parse(TIENDA_JSON);
               
                info["usuarios"].forEach((element, index)=>{
                    console.log("Usuario registrado ------------------------>: " + (index + 1) + ": " + element["nombre"]+"/"+ element["user"]+"/"+ element["correo"]);
                    
                    content = RESPUESTA;
                    let html_extra = "";
                    if (correo==element["correo"] && usuario==element["user"]) {
                        console.log("coincideeee");
                        html_extra = "<h2>No necesita registrarse!!</h2>";
                    
                        //-- Reemplazar las palabras claves por su valores en la plantilla HTML
                        content = RESPUESTA.replace("NOMBRE", nombre);
                        content = content.replace("USUARIO", usuario);
                        content = content.replace("CORREO", correo);
                        content = content.replace("HTML_EXTRA", html_extra);
                        mime[type]= "text/html";
                    }else{
                        content = fs.readFileSync('error.html','utf-8'); 
                        mime[type]= "text/html";
                    }
        
                });
                break;
            
       

        case 'cliente.js':
            
            fs.readFile(filename, 'utf-8', (err,data) => {
                if (err) {
                    console.log("Error: " + err)
                    return;
                } else {
                  res.setHeader('Content-Type', 'application/javascript');
                  res.write(data);
                  res.end();
                }
            });
            
            return;
            break;
        
        case 'tienda.css':
            content = fs.readFileSync(filename);
            break;
        case 'style.css':
            content = fs.readFileSync(filename);
            break;
        case 'login.css':
            content = fs.readFileSync(filename);
            break;
        case 'error.css':
            content = fs.readFileSync(filename);
            break;

        case 'img/fondo.jpg':
            content = fs.readFileSync(filename);
            break;

        case 'tienda.html':
            content = MAIN;
            get_cookie(req);
            break; 
        case 'login.html':
            content = FORMULARIO;
            get_cookie(req);
            break; 
        case 'login_res.html':
            content = RESPUESTA;
            get_cookie(req);
            break; 
        //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }
    
    //-- Si hay datos en el cuerpo, se imprimen
    req.on('data', (cuerpo) => {
  
        //-- Los datos del cuerpo son caracteres
        req.setEncoding('utf8');
        console.log(`Cuerpo (${cuerpo.length} bytes)`);
        console.log(` ${cuerpo}`);
        usuario= recortar(data, "=")
        console.log(usuario);
     });
        
    
        //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
        req.on('end', ()=> {

        //-- Generar respuesta
        res.setHeader('Content-Type', mime[type]);
        res.write(content);
        res.end();
        
    });
  
});
  
//-- Activar el servidor
server.listen(port);

//-- Mensaje de inicio
console.log("Server esta activo. \nEscuchando en puerto: " + port);
