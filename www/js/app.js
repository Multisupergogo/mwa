/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const video = document.getElementById("kamera");
const canvas = document.getElementById("slika");
const rezultatBoje = document.getElementById("rezultatBoje");
const context = canvas.getContext("2d");

// Funkcija za pokretanje kamere
async function pokreniKameru() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Greška pri pristupu kameri:", error);
    }
    
    document.getElementById("myButton").addEventListener("click", prepoznajBoju);
}

// Funkcija za prepoznavanje boje
function prepoznajBoju() {
    // Crtanje trenutnog okvira iz videa na canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Uzimamo boju s centra canvasa
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pixelData = context.getImageData(centerX, centerY, 1, 1).data;

    // Dobivanje RGB vrijednosti
    const [red, green, blue] = pixelData;

    // Prikaz boje kao heksadecimalni kod
    const hexBoja = rgbToHex(red, green, blue);
    rezultatBoje.innerHTML = `Boja: ${hexBoja} (R:${red} G:${green} B:${blue})`;
    rezultatBoje.style.color = hexBoja;
}

// Funkcija za pretvaranje RGB u HEX
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Pokretanje kamere kada se stranica učita
window.onload = pokreniKameru;


