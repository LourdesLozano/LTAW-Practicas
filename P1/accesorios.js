
// BOTONES
const btn_collares = document.getElementById("btn_collares");
const btn_abrigos = document.getElementById("btn_collares");
const btn_lazos = document.getElementById("btn_collares");

// Que no aaprezca ningun elemento
document.getElementById('productos').style.display = 'none';

// COLLARES
btn_collares.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}

// ABRIGOS
btn_abrigos.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}

//LAZOS
btn_lazos.onclick = () => {
    document.getElementById('productos').style.display = 'block';
}