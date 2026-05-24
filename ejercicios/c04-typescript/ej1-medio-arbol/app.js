"use strict";
const inputAltura = document.querySelector("#altura");
const boton = document.querySelector("#btnGenerar");
const resultado = document.querySelector("#resultado");
function generarAsteriscos(altura) {
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        for (let j = 1; j <= i; j++) {
            arbol += "*";
        }
        arbol += "\n";
    }
    return arbol;
}
boton.addEventListener("click", () => {
    const altura = Number(inputAltura.value);
    if (inputAltura.value === "" || altura < 1) {
        resultado.textContent = "Error: ingresar un número mayor o igual a 1.";
        return;
    }
    resultado.textContent = generarAsteriscos(altura);
});
