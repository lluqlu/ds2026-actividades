"use strict";
async function obtenerUsuarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const datos = await respuesta.json();
    return datos;
}
async function main() {
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(u => {
            console.log(`${u.name} — ${u.email}`);
        });
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}
main();
