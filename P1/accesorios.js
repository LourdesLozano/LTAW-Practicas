
// BOTONES
const btn_collares = document.getElementById("btn_collares");
const btn_abrigos = document.getElementById("btn_collares");
const btn_lazos = document.getElementById("btn_collares");

// collares
const collar1 = document.getElementById("collar1");
const collar2 = document.getElementById("collar2");
const collar3 = document.getElementById("collar3");

// Que no aaprezca ningun elemento
document.getElementById('productos').style.display = 'none';
document.getElementById('texto').style.display = 'none';

// COLLARES
btn_collares.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}

collar1.onclick = () => {
    document.getElementById('texto').style.display = 'block';
}


// ABRIGOS
btn_abrigos.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}

//LAZOS
btn_lazos.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}