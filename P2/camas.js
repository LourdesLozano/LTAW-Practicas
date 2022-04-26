// BOTONES------------------------------------------------------
const cama1 = document.getElementById("cama1");
const cama2 = document.getElementById("cama2");
const cama3 = document.getElementById("cama3");

// Que no aaprezca ningun elemento--------------------------------------
document.getElementById('texto18').style.display = 'none';
document.getElementById('texto19').style.display = 'none';
document.getElementById('texto20').style.display = 'none';

// JUGUETES--------------------------------------------------------------
cama1.onclick = () => {
    document.getElementById('texto18').style.display = 'block';
}
cama2.onclick = () => {
    document.getElementById('texto19').style.display = 'block';
}
cama3.onclick = () => {
    document.getElementById('texto20').style.display = 'block';
}
