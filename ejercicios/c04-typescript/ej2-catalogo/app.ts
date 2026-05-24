interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "978-0-7432-7356-5", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, disponible: true, genero: "Cuentos" },
    { isbn: "978-84-376-0494-7", titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, disponible: true, genero: "Novela" },
    { isbn: "978-84-204-8192-3", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, disponible: false, genero: "Cuentos" },
    { isbn: "978-0-06-093546-9", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 22000, disponible: true, genero: "Novela" },
    { isbn: "978-84-322-1929-7", titulo: "El túnel", autor: "Ernesto Sábato", precio: 12000, disponible: false },
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(l => l.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listado = document.querySelector("#listado") as HTMLUListElement;
    const stats = document.querySelector("#stats") as HTMLParagraphElement;

    listado.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} — ${l.autor} — $${l.precio.toLocaleString("es-AR")} — ${l.disponible ? "Disponible" : "No disponible"}`;
        listado.appendChild(li);
    });

    stats.textContent = `Total: ${libros.length} libro(s) — Precio promedio: $${precioPromedio(libros).toLocaleString("es-AR")}`;
}

const inputFiltro = document.querySelector("#filtroAutor") as HTMLInputElement;
const btnFiltrar = document.querySelector("#filtrar") as HTMLButtonElement;
const btnDisponibles = document.querySelector("#mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.querySelector("#mostrarTodos") as HTMLButtonElement;

btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputFiltro.value));
});

btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});

renderizar(catalogo);
