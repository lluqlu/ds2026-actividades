function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else {
        return "Promocionado";
    }
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado (fin de semana)";
        case 7:
            return "Domingo (fin de semana)";
        default:
            return "Día inválido";
    }
}

console.log("Pruebas de clasificarNota:");
console.log(`Nota 2: ${clasificarNota(2)}`);
console.log(`Nota 4: ${clasificarNota(4)}`);
console.log(`Nota 7: ${clasificarNota(7)}`);
console.log(`Nota 9: ${clasificarNota(9)}`);

console.log("Pruebas de diaDeLaSemana:");
console.log(`Día 1: ${diaDeLaSemana(1)}`);
console.log(`Día 5: ${diaDeLaSemana(5)}`);
console.log(`Día 6: ${diaDeLaSemana(6)}`);
console.log(`Día 7: ${diaDeLaSemana(7)}`);
console.log(`Día 10: ${diaDeLaSemana(10)}`);
