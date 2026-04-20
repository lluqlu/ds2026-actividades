const inputAltura = document.querySelector("#altura");
const boton = document.querySelector("#btnGenerar");
const resultado = document.querySelector("#resultado");

boton.addEventListener("click", () => {
    const altura = Number(inputAltura.value);

    if (inputAltura.value === "" || altura < 1) {
        resultado.textContent = "Error: ingresar un número mayor o igual a 1.";
        return;
    }

    let arbol = "";

    for (let i = 1; i <= altura; i++) {
        for (let j = 1; j <= i; j++) {
            arbol += "*";
        }

        arbol += "\n";
    }

    resultado.textContent = arbol;
});
