async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.docs.slice(0, 10);
}

function renderizarResultados(libros) {
    const contenedor = document.querySelector("#resultados");
    contenedor.innerHTML = "";

    if (libros.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    const row = document.createElement("div");
    row.className = "row g-4";

    libros.forEach(libro => {
        const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
        const anio = libro.first_publish_year ? ` (${libro.first_publish_year})` : "";

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        col.innerHTML = `
            <div class="card h-100">
                <img src="https://placehold.co/300x200?text=Libro" class="card-img-top" alt="${libro.title}">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text text-muted">${autor}${anio}</p>
                    <a href="libro.html" class="btn btn-outline-dark btn-sm">Ver más</a>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    contenedor.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#inputBusqueda");
    const btnBuscar = document.querySelector("#btnBuscar");
    const error = document.querySelector("#errorBusqueda");

    if (!btnBuscar) return;

    btnBuscar.addEventListener("click", async () => {
        const query = input.value.trim();

        if (!query) {
            error.textContent = "Ingresá un término de búsqueda.";
            error.style.display = "block";
            return;
        }

        error.style.display = "none";
        document.querySelector("#resultados").innerHTML = "<p>Cargando...</p>";

        try {
            const libros = await buscarLibros(query);
            renderizarResultados(libros);
        } catch (e) {
            document.querySelector("#resultados").innerHTML = "";
            error.textContent = "Error al buscar. Intentá de nuevo.";
            error.style.display = "block";
        }
    });
});
