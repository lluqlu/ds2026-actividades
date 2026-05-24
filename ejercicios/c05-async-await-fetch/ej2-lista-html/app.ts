interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const datos = await respuesta.json();
    return datos as Usuario[];
}

const cargando = document.querySelector("#cargando") as HTMLParagraphElement;
const error = document.querySelector("#error") as HTMLParagraphElement;
const lista = document.querySelector("#lista") as HTMLUListElement;

async function main(): Promise<void> {
    try {
        const usuarios = await obtenerUsuarios();
        cargando.style.display = "none";

        usuarios.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `${u.name} — ${u.email}`;
            lista.appendChild(li);
        });
    } catch (e) {
        cargando.style.display = "none";
        error.style.display = "block";
        error.textContent = "Error al cargar los usuarios. Intentá de nuevo más tarde.";
    }
}

main();
