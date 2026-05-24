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

async function main(): Promise<void> {
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(u => {
            console.log(`${u.name} — ${u.email}`);
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

main();
