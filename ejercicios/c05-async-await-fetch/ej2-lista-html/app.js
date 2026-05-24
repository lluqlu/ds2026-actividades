"use strict";
async function obtenerUsuarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const datos = await respuesta.json();
    return datos;
}
const cargando = document.querySelector("#cargando");
const error = document.querySelector("#error");
const lista = document.querySelector("#lista");
async function main() {
    try {
        const usuarios = await obtenerUsuarios();
        cargando.style.display = "none";
        usuarios.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `${u.name} — ${u.email}`;
            lista.appendChild(li);
        });
    }
    catch (e) {
        cargando.style.display = "none";
        error.style.display = "block";
        error.textContent = "Error al cargar los usuarios. Intentá de nuevo más tarde.";
    }
}
main();
