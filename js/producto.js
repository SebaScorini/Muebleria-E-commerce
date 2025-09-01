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
        <label>
          Cantidad: <input type="number" min="1" max="10" value="1" id="cantidad-producto">
        </label>
        <button id="agregar-carrito-detalle">Añadir al Carrito</button>
      </div>
    </div>
  `;
} else {
  contenedor.textContent = "Producto no encontrado.";
}

// Lógica para agregar al carrito desde la página de detalle
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || {};
}
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function actualizarContador() {
  const carrito = obtenerCarrito();
  const total = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);
  const contador = document.getElementById('cart-count');
  if (contador) contador.textContent = total;
}
document.addEventListener('DOMContentLoaded', function() {
  actualizarContador();
  const btn = document.getElementById('agregar-carrito-detalle');
  if (btn) {
    btn.addEventListener('click', function() {
      const cantidad = parseInt(document.getElementById('cantidad-producto').value, 10) || 1;
      let carrito = obtenerCarrito();
      if (carrito[id]) {
        carrito[id].cantidad += cantidad;
      } else {
        carrito[id] = { cantidad };
      }
      guardarCarrito(carrito);
      actualizarContador();
    });
  }
});