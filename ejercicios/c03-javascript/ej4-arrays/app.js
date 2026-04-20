const numeros = [12, 5, 8, 21, 3, 17, 9, 14];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const numero of numeros) {
    suma += numero;

    if (numero > mayor) {
        mayor = numero;
    }

    if (numero < menor) {
        menor = numero;
    }
}

const promedio = suma / numeros.length;

console.log(`Array: ${numeros}`);
console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${mayor}`);
console.log(`Número menor: ${menor}`);

function generarAsteriscos(n) {
    let resultado = "";

    for (let i = 0; i < n; i++) {
        resultado += "*";
    }

    return resultado;
}

console.log(`Asteriscos (5): ${generarAsteriscos(5)}`);
console.log(`Asteriscos (10): ${generarAsteriscos(10)}`);
