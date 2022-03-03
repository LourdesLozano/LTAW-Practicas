// BOTONES------------------------------------------------------
const btn_camas = document.getElementById("btn_camas")

const cama1 = document.getElementById("cama1");
const cama2 = document.getElementById("cama2");
const cama3 = document.getElementById("cama3");

// Que no aaprezca ningun elemento--------------------------------------
document.getElementById('productos7').style.display = 'none';

document.getElementById('texto18').style.display = 'none';
document.getElementById('texto19').style.display = 'none';
document.getElementById('texto20').style.display = 'none';

// JUGUETES--------------------------------------------------------------
btn_camas.onclick = () => {
    document.getElementById('productos7').style.display = 'block';
    document.getElementById('texto18').style.display = 'none';
    document.getElementById('texto19').style.display = 'none';
    document.getElementById('texto20').style.display = 'none';
}

cama1.onclick = () => {
    document.getElementById('texto18').style.display = 'block';
}
cama2.onclick = () => {
    document.getElementById('texto19').style.display = 'block';
}
cama3.onclick = () => {
    document.getElementById('texto20').style.display = 'block';
}
