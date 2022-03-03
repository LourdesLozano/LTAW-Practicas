
// BOTONES------------------------------------------------------
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

// lazos
const lazos1 = document.getElementById("lazos1");
const lazos2 = document.getElementById("lazos2");
const lazos3 = document.getElementById("lazos3");



// Que no aaprezca ningun elemento--------------------------------------
document.getElementById('productos').style.display = 'none'; // collares
document.getElementById('productos2').style.display = 'none'; // abrigos
document.getElementById('productos3').style.display = 'none'; // lazos

// textos collares
document.getElementById('texto1').style.display = 'none';
document.getElementById('texto2').style.display = 'none';
document.getElementById('texto3').style.display = 'none';
// textos abrigos
document.getElementById('texto4').style.display = 'none';
document.getElementById('texto5').style.display = 'none';
document.getElementById('texto6').style.display = 'none';
// textos lazos
document.getElementById('texto7').style.display = 'none';
document.getElementById('texto8').style.display = 'none';
document.getElementById('texto9').style.display = 'none';


// COLLARES-----------------------------------------------------------------
btn_collares.onclick = () => {
    document.getElementById('productos').style.display = 'block';
    document.getElementById('productos2').style.display = 'none';
    document.getElementById('productos3').style.display = 'none'; 
    document.getElementById('texto1').style.display = 'none';
    document.getElementById('texto2').style.display = 'none';
    document.getElementById('texto3').style.display = 'none';
   
}
collar1.onclick = () => {
    document.getElementById('texto1').style.display = 'block';
}
collar2.onclick = () => {
    document.getElementById('texto2').style.display = 'block';
}
collar3.onclick = () => {
    document.getElementById('texto3').style.display = 'block';
}


// ABRIGOS------------------------------------------------------------------
btn_abrigos.onclick = () => {   
    document.getElementById('productos2').style.display = 'block';
    document.getElementById('productos').style.display = 'none';
    document.getElementById('productos3').style.display = 'none';
    document.getElementById('texto4').style.display = 'none';
    document.getElementById('texto5').style.display = 'none';
    document.getElementById('texto6').style.display = 'none';
    
}
abrigo1.onclick = () => {
    document.getElementById('texto4').style.display = 'block';
}
abrigo2.onclick = () => {
    document.getElementById('texto5').style.display = 'block';
}
abrigo3.onclick = () => {
    document.getElementById('texto6').style.display = 'block';
}



//LAZOS-----------------------------------------------------------------
btn_lazos.onclick = () => {
    document.getElementById('productos3').style.display = 'block';
    document.getElementById('productos').style.display = 'none'; 
    document.getElementById('productos2').style.display = 'none';
    document.getElementById('texto7').style.display = 'none';
    document.getElementById('texto8').style.display = 'none';
    document.getElementById('texto9').style.display = 'none';
}
lazos1.onclick = () => {
    document.getElementById('texto7').style.display = 'block';
}
lazos2.onclick = () => {
    document.getElementById('texto8').style.display = 'block';
}
lazos3.onclick = () => {
    document.getElementById('texto9').style.display = 'block'; 
}