"use strict";
const catalogo = [
    { isbn: "978-0-7432-7356-5", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, disponible: true, genero: "Cuentos" },
    { isbn: "978-84-376-0494-7", titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, disponible: true, genero: "Novela" },
    { isbn: "978-84-204-8192-3", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, disponible: false, genero: "Cuentos" },
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    const idx = catalogo.findIndex(l => l.isbn === isbn);
    if (idx !== -1) {
        catalogo.splice(idx, 1);
    }
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.querySelector("#inputTitulo").value.trim();
    const autor = document.querySelector("#inputAutor").value.trim();
    const precioStr = document.querySelector("#inputPrecio").value;
    const genero = document.querySelector("#inputGenero").value.trim();
    const disponible = document.querySelector("#inputDisponible").checked;
    const precio = Number(precioStr);
    if (!titulo || !autor || !precioStr || precio <= 0) {
        return null;
    }
    const libro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
    };
    if (genero)
        libro.genero = genero;
    return libro;
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    return total / libros.length;
}
function renderizar(libros) {
    const listado = document.querySelector("#listado");
    const stats = document.querySelector("#stats");
    listado.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} — ${l.autor} — $${l.precio.toLocaleString("es-AR")} — ${l.disponible ? "Disponible" : "No disponible"}`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarLibro(l.isbn));
        li.appendChild(btnEliminar);
        listado.appendChild(li);
    });
    stats.textContent = `Total: ${libros.length} libro(s) — Precio promedio: $${precioPromedio(libros).toLocaleString("es-AR")}`;
}
const inputFiltro = document.querySelector("#filtroAutor");
const btnFiltrar = document.querySelector("#filtrar");
const btnDisponibles = document.querySelector("#mostrarDisponibles");
const btnTodos = document.querySelector("#mostrarTodos");
const btnAgregar = document.querySelector("#btnAgregar");
const errorForm = document.querySelector("#errorForm");
btnFiltrar.addEventListener("click", () => {
    renderizar(catalogo.filter(l => l.autor.toLowerCase().includes(inputFiltro.value.toLowerCase())));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(catalogo.filter(l => l.disponible));
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (libro === null) {
        errorForm.textContent = "Error: completar título, autor y precio (mayor a 0).";
        return;
    }
    errorForm.textContent = "";
    agregarLibro(libro);
    document.querySelector("#inputTitulo").value = "";
    document.querySelector("#inputAutor").value = "";
    document.querySelector("#inputPrecio").value = "";
    document.querySelector("#inputGenero").value = "";
    document.querySelector("#inputDisponible").checked = false;
});
renderizar(catalogo);
