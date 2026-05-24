"use strict";
async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.docs.slice(0, 10);
}
const input = document.querySelector("#inputBusqueda");
const btnBuscar = document.querySelector("#btnBuscar");
const resultados = document.querySelector("#resultados");
const error = document.querySelector("#error");
btnBuscar.addEventListener("click", async () => {
    const query = input.value.trim();
    if (!query) {
        error.style.display = "block";
        error.textContent = "Ingresá un término de búsqueda.";
        return;
    }
    error.style.display = "none";
    resultados.innerHTML = "<p>Cargando...</p>";
    try {
        const libros = await buscarLibros(query);
        resultados.innerHTML = "";
        if (libros.length === 0) {
            resultados.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }
        libros.forEach(libro => {
            const tarjeta = document.createElement("div");
            const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
            const anio = libro.first_publish_year ? ` (${libro.first_publish_year})` : "";
            tarjeta.innerHTML = `<strong>${libro.title}</strong> — ${autor}${anio}`;
            tarjeta.style.marginBottom = "8px";
            resultados.appendChild(tarjeta);
        });
    }
    catch (e) {
        resultados.innerHTML = "";
        error.style.display = "block";
        error.textContent = "Error al buscar libros. Intentá de nuevo más tarde.";
    }
});
