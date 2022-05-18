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
const TIENDA = fs.readFileSync('tienda.html','utf-8');

const TIENDA_JSON = fs.readFileSync('tienda.json','utf-8');

//-- Mensaje de arranque
console.log("Arrancando servidor...");

function get_cookie(req){

    //-- Leer las cookies
    const cookie = req.headers.cookie;

    if (cookie) {

        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        
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
        console.log(' ');
    }
}

function get_compra(req){

    const cookie = req.headers.cookie;

    if(cookie){
            //-- par de nombre valor 
            let par = cookie.split(";");
            par.forEach((element,index)=>{
                let [nombre, valor] = element.split("=");

                if (nombre.trim() === 'user') {
                    user = valor;
                    content = content.replace("USUARIO", user);
                }

                if (nombre.trim() === 'carrito') {
                    res.setHeader('Set-Cookie', element + ':' + producto);
                }

            });
    }else{
        content = content.replace("HTML_EXTRA", "Tienes que registrarte antes de realizar un pedido");
    }
}


//-- Crear el sevidor
const server = http.createServer((req, res) => { 

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  

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
            content = TIENDA;
            get_cookie(req);
            break;

        case 'login':
           
            let usuario = myURL.searchParams.get('usuario');
            let correo = myURL.searchParams.get('correo');

            let info = JSON.parse(TIENDA_JSON);
            let user1 = info['usuarios'][0]['user'];
            let correo1 = info['usuarios'][0]['correo'];
            let name1 = info['usuarios'][0]['nombre'];
            let name2 = info['usuarios'][1]['nombre'];
            let user2 = info['usuarios'][1]['user'];
            let correo2 = info['usuarios'][1]['correo'];

            content = RESPUESTA;
  
            if (correo==correo1 && usuario==user1) {
                console.log("Coincide");
    
                content = content.replace("HTML_EXTRA", "Bienvenido " + name1);
                mime[type]= "text/html";

            }else if (correo==correo2 && usuario==user2){
                console.log("Coincide");
    
                content = content.replace("HTML_EXTRA", "Bienvenido " + name2);
                mime[type]= "text/html";

            }else{
                content = content.replace("HTML_EXTRA", "NO ESTA REGISTRADO");
                mime[type]= "text/html";
            }
    
            break;

            case 'productos':
                let info_productos = JSON.parse(TIENDA_JSON);
                productos = info_productos["productos"];
                
                console.log("Productos en la tienda: " + productos[1]["nombre"]);
                content_type = "application/json";
    
                let param1 = myURL.searchParams.get('param1');
                param1 = param1.toUpperCase();
    
                let result = [];
    
                for (let prod of productos) {
                   
                    prodU = prod["nombre"].toUpperCase();
                    if (prodU.startsWith(param1)) {
                        result.push(prod);
                    }
                }
    
                //-- Pasar una variable a formato JSON. Se hace con el método:
                console.log(result[0]);
                content = JSON.stringify(result);
                mime[type] ="text/html";
                break;
        
        case 'client.js':
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

        case 'pedidos':
            content = fs.readFileSync('compra_res.html', 'utf-8'); 

            let user_p = myURL.searchParams.get('usuario');
            let direccion = myURL.searchParams.get('direccion');
            let tarjeta = myURL.searchParams.get('tarjeta');
            console.log(" Usuario: " + user_p);
            console.log(" Direccion: " + direccion);
            console.log(" tarjeta ---> " + tarjeta);
            res.setHeader('Set-Cookie', user_p);

            info_pedidos = JSON.parse(TIENDA_JSON);
            info_pedidos = info_pedidos["pedidos"][1];
          
            console.log("Productos en la tienda: " + info_pedidos);

            content = content.replace("USUARIO", user_p);
            content = content.replace("DIRECCION", direccion);
            content = content.replace("TARJETA", tarjeta);
            mime[type]= "text/html";

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
        //------- Imagenes
        case 'img/fondo.jpg':
            content = fs.readFileSync(filename);
            break;
        case 'img/accesorios.png':
            content = fs.readFileSync(filename);
            break;
        case 'img/alimentos.jpg':
            content = fs.readFileSync(filename);
            break;
        case 'img/camas.jpg':
            content = fs.readFileSync(filename);
            break;
        case 'img/juguetes.jpg':
            content = fs.readFileSync(filename);
            break;
        case 'img/titulo.png':
            content = fs.readFileSync(filename);
            break;
        case 'img/carrito.png':
            content = fs.readFileSync(filename);
            break;
        case 'img/login.png':
            content = fs.readFileSync(filename);
        break;
        case 'img/huella.png':
            content = fs.readFileSync(filename);
        break;
        case 'img/fondo2.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/fondo8.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/flecha.png':
            content = fs.readFileSync(filename);
        break;
        case 'img/ubicacion.png':
            content = fs.readFileSync(filename);
        break;
        case 'img/accesorios/rosa.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/fondo2.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/alimentos/pienso1.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/juguetes/juguete4.jpg':
            content = fs.readFileSync(filename);
        break;
        case 'img/camas/cama1.jpg':
            content = fs.readFileSync(filename);
        break;
        
            
        //------- Letras
        case 'disney.otf':
            content = fs.readFileSync(filename);
            break;
        case '101PUPS.TTF':
            content = fs.readFileSync(filename);
            break;
        //------- ficheros html
        case 'tienda.html':
            content = TIENDA;
            get_cookie(req);
            break; 
        case 'accesorios.html':
            content = fs.readFileSync(filename);
            get_cookie(req);
            break;
        case 'alimentos.html':
            content = fs.readFileSync(filename);
            get_cookie(req);
            break;
        case 'juguetes.html':
            content = fs.readFileSync(filename);
            get_cookie(req);
            break;
        case 'camas.html':
            content = fs.readFileSync(filename);
            get_cookie(req);
            break;
        case 'error.html':
            content = ERROR;
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
        case 'compra.html':
            content = fs.readFileSync(filename,'utf-8');
            get_compra(req);
            break; 
        case 'compra_res.html':
            content = fs.readFileSync(filename,'utf-8');
            get_compra(req);
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
