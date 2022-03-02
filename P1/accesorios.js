
// BOTONES
const btn_collares = document.getElementById("btn_collares");
const btn_abrigos = document.getElementById("btn_abrigos");
const btn_lazos = document.getElementById("btn_lazos");

// collares
const collar1 = document.getElementById("collar1");
const collar2 = document.getElementById("collar2");
const collar3 = document.getElementById("collar3");

// abrigos
const abrigo1 = document.getElementById("abrigo1");
const abrigo2 = document.getElementById("abrigo2");
const abrigo3 = document.getElementById("abrigo3");

// Que no aaprezca ningun elemento
document.getElementById('productos').style.display = 'none'; // collares
document.getElementById('productos2').style.display = 'none'; // abrigos
document.getElementById('texto1').style.display = 'none';
document.getElementById('texto2').style.display = 'none';
document.getElementById('texto3').style.display = 'none';

// COLLARES-----------------------------------------------------------------
btn_collares.onclick = () => {
    document.getElementById('productos').style.display = 'block';
    document.getElementById('productos2').style.display = 'none';
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto2').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
   
}
collar1.onclick = () => {
    document.getElementById('texto1').style.display = 'block';
    document.getElementById('texto2').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
}
collar2.onclick = () => {
    document.getElementById('texto2').style.display = 'block';
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
}
collar3.onclick = () => {
    document.getElementById('texto3').style.display = 'block';
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto2').style.display = 'none';
}


// ABRIGOS------------------------------------------------------------------
btn_abrigos.onclick = () => {   
    document.getElementById('productos2').style.display = 'block';
    document.getElementById('productos').style.display = 'none';
    
}
abrigo1.onclick = () => {
    document.getElementById('texto1').style.display = 'block';
    document.getElementById('texto2').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
}
abrigo2.onclick = () => {
    document.getElementById('texto2').style.display = 'block';
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
}
abrigo3.onclick = () => {
    document.getElementById('texto3').style.display = 'block';
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto2').style.display = 'none';
}



//LAZOS-----------------------------------------------------------------
btn_lazos.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}