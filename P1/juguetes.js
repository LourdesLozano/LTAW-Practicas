// BOTONES------------------------------------------------------
const btn_juguetes = document.getElementById("btn_juguetes")

const juguete1 = document.getElementById("juguete1");
const juguete2 = document.getElementById("juguete2");
const juguete3 = document.getElementById("juguete3");
const juguete4 = document.getElementById("juguete4");

// Que no aaprezca ningun elemento--------------------------------------
document.getElementById('productos6').style.display = 'none';

document.getElementById('texto14').style.display = 'none';
document.getElementById('texto15').style.display = 'none';
document.getElementById('texto16').style.display = 'none';
document.getElementById('texto17').style.display = 'none';

// JUGUETES--------------------------------------------------------------
btn_juguetes.onclick = () => {
    document.getElementById('productos6').style.display = 'block';
    document.getElementById('texto14').style.display = 'none';
    document.getElementById('texto15').style.display = 'none';
    document.getElementById('texto16').style.display = 'none';
    document.getElementById('texto17').style.display = 'none';
}

juguete1.onclick = () => {
    document.getElementById('texto14').style.display = 'block';
}
juguete2.onclick = () => {
    document.getElementById('texto15').style.display = 'block';
}
juguete3.onclick = () => {
    document.getElementById('texto16').style.display = 'block';
}
juguete4.onclick = () => {
    document.getElementById('texto17').style.display = 'block';
}