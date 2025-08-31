// Array de productos destacados
const productosDestacados = [
    {
        id: "p1",
        nombre: "Mesa Comedor Pampa",
        precio: 85000,
        imagen: "img/Mesa-Comedor-Pampa.png"
    },
    {
        id: "p2",
        nombre: "Mesa de Centro Araucaria",
        precio: 45000,
        imagen: "img/Mesa-de-Centro-Araucaria.png"
    },
    {
        id: "p3",
        nombre: "Sofá Patagonia",
        precio: 120000,
        imagen: "img/Sofá-Patagonia.png"
    },
    {
        id: "p4",
        nombre: "Silla de Trabajo Belgrano",
        precio: 38000,
        imagen: "img/Silla-de-Trabajo-Belgrano.png"
    },
    {
        id: "p5",
        nombre: "Aparador Uspallata",
        precio: 99000,
        imagen: "img/Aparador-Uspallata.png"
    },
    {
        id: "p6",
        nombre: "Biblioteca Recoleta",
        precio: 135000,
        imagen: "img/Biblioteca-Recoleta.png"
    }
];

// Render dinámico de productos destacados
function mostrarProductosDestacados() {
    const contenedor = document.getElementById("productos-container");

    productosDestacados.forEach(prod => {
        const article = document.createElement("article");
        article.classList.add("producto");
        article.setAttribute("data-id", prod.id);

        article.innerHTML = `
            <a href="producto.html?id=${prod.id}">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p class="precio">$${prod.precio.toLocaleString("es-AR")}</p>
            </a>
            <button type="button" data-add-cart="${prod.id}">
                Añadir al Carrito
            </button>
        `;

        contenedor.appendChild(article);
    });
}

document.addEventListener("DOMContentLoaded", mostrarProductosDestacados);
