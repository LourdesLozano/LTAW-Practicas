// BOTONES------------------------------------------------------
const btn_piensos = document.getElementById("btn_piensos")

// Pienso
const pienso1 = document.getElementById("pienso1");
const pienso2 = document.getElementById("pienso2");

// Que no aaprezca ningun elemento--------------------------------------
document.getElementById('productos4').style.display = 'none'; // piensos
//ocument.getElementById('productos5').style.display = 'none'; // premios
// texto piensos
document.getElementById('texto10').style.display = 'none';
document.getElementById('texto11').style.display = 'none';

// PIENSOS-----------------------------------------------------------------
btn_piensos.onclick = () => {
    document.getElementById('productos4').style.display = 'block';
    //document.getElementById('productos5').style.display = 'none';
    document.getElementById('texto10').style.display = 'none';
    document.getElementById('texto11').style.display = 'none';
   
}
pienso1.onclick = () => {
    document.getElementById('texto10').style.display = 'block';
}
pienso2.onclick = () => {
    document.getElementById('texto11').style.display = 'block';
}
