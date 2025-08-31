// Base de datos de productos
const productos = {
  p1: {
    nombre: "Mesa Comedor Pampa",
    precio: 85000,
    descripcion: "Una mesa robusta de madera maciza, ideal para reuniones familiares.",
    imagen: "img/Mesa-Comedor-Pampa.png"
  },
  p2: {
    nombre: "Mesa de Centro Araucaria",
    precio: 42000,
    descripcion: "Elegante mesa de centro con diseño minimalista.",
    imagen: "img/Mesa-de-Centro-Araucaria.png"
  },
  p3: {
    nombre: "Sofá Patagonia",
    precio: 120000,
    descripcion: "Sofá amplio y cómodo, tapizado en tela de alta calidad.",
    imagen: "img/Sofá-Patagonia.png"
  },
  p4: {
    nombre: "Silla de Trabajo Belgrano",
    precio: 35000,
    descripcion: "Silla ergonómica para largas jornadas de trabajo.",
    imagen: "img/Silla-de-Trabajo-Belgrano.png"
  },
  p5: {
    nombre: "Aparador Uspallata",
    precio: 55000,
    descripcion: "Silla ergonómica para largas jornadas de trabajo.",
    imagen: "img/Aparador-Uspallata.png"
  },
  p6: {
    nombre: "Biblioteca Recoleta",
    precio: 49000,
    descripcion: "Silla ergonómica para largas jornadas de trabajo.",
    imagen: "img/Biblioteca-Recoleta.png"
  }
};

// 1. Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. Buscar el producto
const producto = productos[id];

// 3. Generar el HTML
const contenedor = document.getElementById("detalle-container");

if (producto) {
  contenedor.innerHTML = `
    <div class="producto-detalle">
      <div class="detalle-imagen">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="detalle-info">
        <h1>${producto.nombre}</h1>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
        <button>Añadir al Carrito</button>
      </div>
    </div>
  `;
} else {
  contenedor.textContent = "Producto no encontrado.";
}