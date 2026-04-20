function calcularPrecioFinal(monto, medioPago) {
    if (monto < 200) {
        return monto;
    }

    if (monto <= 400) {
        if (medioPago === "E") {
            return monto * 0.70;
        } else if (medioPago === "D") {
            return monto * 0.80;
        } else {
            return monto * 0.90;
        }
    }

    return monto * 0.60;
}

/* Pruebas */

console.log(`Monto: $150 | Pago: E | Final: $${calcularPrecioFinal(150, "E")}`);
console.log(`Monto: $250 | Pago: E | Final: $${calcularPrecioFinal(250, "E")}`);
console.log(`Monto: $250 | Pago: D | Final: $${calcularPrecioFinal(250, "D")}`);
console.log(`Monto: $250 | Pago: C | Final: $${calcularPrecioFinal(250, "C")}`);
console.log(`Monto: $500 | Pago: E | Final: $${calcularPrecioFinal(500, "E")}`);
console.log(`Monto: $700 | Pago: C | Final: $${calcularPrecioFinal(700, "C")}`);
