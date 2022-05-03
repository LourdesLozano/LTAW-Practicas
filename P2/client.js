
// CLIENTE ---------------------------------------------------

const display = document.getElementById("display");
const caja = document.getElementById("caja");

//-- Retrollamada de productos
caja.oninput = () => {

    //-- Crear objeto para peticiones AJAX
    const m = new XMLHttpRequest();

    //-- Función de callback que se invoca cuando
    //-- hay cambios de estado en la petición
    m.onreadystatechange = () => {

        //-- Petición enviada y recibida
        if (m.readyState == 4) {

            if (m.status == 200) {
                
                let productos = JSON.parse(m.responseText);
                display.innerHTML = "";
            
                //--Recorrer los productos de JSON
                for (let i =0 ; i < productos.length; i++) {

                    //-- añadir producto
                    display.innerHTML += productos[i]["nombre"];

                    if (i < productos.length-1) {
                    display.innerHTML += ', ';
                    }
                }

            } else { // si hay error en peticion
                console.log("Error en la petición: " + m.status + " " + m.statusText);
                display.innerHTML += '<p>ERROR</p>'
            }
        }   
    }

    console.log(caja.value.length);

    //-- La peticion se realia  si hay al menos 1 carácter
    if (caja.value.length >= 1) {

      m.open("GET","/productos?param1=" + caja.value, true);
      m.send();
      
    } else {
        display.innerHTML = "";
    }
} 