const inputProducto = document.querySelector("#producto");
const botonAgregar = document.querySelector("#btnAgregar");
const listaProductos = document.querySelector("#listaProductos");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");

function actualizarContador() {
    const cantidad = listaProductos.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
}

botonAgregar.addEventListener("click", () => {
    const nombreProducto = inputProducto.value.trim();

    if (nombreProducto === "") {
        mensaje.textContent = "Error: el nombre del producto no puede estar vacío.";
        return;
    }

    mensaje.textContent = "";

    const item = document.createElement("li");
    item.textContent = nombreProducto + " ";

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
        item.remove();
        actualizarContador();
    });

    item.appendChild(botonEliminar);
    listaProductos.appendChild(item);

    inputProducto.value = "";
    actualizarContador();
});
