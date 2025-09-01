// Funciones de carrito
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
document.addEventListener('DOMContentLoaded', actualizarContador);

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
    descripcion: "Mueble con gran capacidad de guardado, estilo rústico-moderno.",
    imagen: "img/Aparador-Uspallata.png"
  },
  p6: {
    nombre: "Biblioteca Recoleta",
    precio: 49000,
    descripcion: "Biblioteca clásica de madera clara, ideal para salas de lectura.",
    imagen: "img/Biblioteca-Recoleta.png"
  },
  p7: {
    nombre: "Butaca Mendoza",
    precio: 65000,
    descripcion: "Butaca elegante con estilo minimalista, perfecta para salas de reuniones.",
    imagen: "img/Butaca-Mendoza.png"
  },
  p8: {
    nombre: "Escritorio Costa",
    precio: 78000,
    descripcion: "Escritorio moderno con diseño minimalista, perfecto para oficinas.",
    imagen: "img/Escritorio-Costa.png"
  },
    p9: {
    nombre: "Mesa de Noche Aconcagua",
    precio: 100000,
    descripcion: "xx",
    imagen: "img/Mesa-de-Noche-Aconcagua.png"
  },
  p10: {
    nombre: "Sillas Córdoba",
    precio: 42000,
    descripcion: "xx",
    imagen: "img/Sillas-Córdoba.png"
  },
  p11: {
    nombre: "Sillón Copacabana",
    precio: 42000,
    descripcion: "xx",
    imagen: "img/Sillón-Copacabana.png"
  }
};
// Hacer productos global para otros scripts
window.productos = productos;

// Contenedor de los productos
const contenedor = document.querySelector(".catalogo-grid");

// Generar el HTML para cada producto
for (const id in productos) {
  const prod = productos[id];

  const card = document.createElement("div");
  card.className = "producto";

  card.innerHTML = `
  <a href="producto.html?id=${id}">
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
  </a>
  <p class="precio">$${prod.precio.toLocaleString("es-AR")}</p>
  <label>
  Cantidad: <input type="number" min="1" max="10" value="1">
  </label>
  <button class="agregar-carrito" data-id="${id}">Agregar al carrito</button>
`;

  contenedor.appendChild(card);
}

// Evento para agregar al carrito
contenedor.addEventListener('click', function(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    const id = e.target.dataset.id;
    const cantidadInput = e.target.parentElement.querySelector('input[type="number"]');
    const cantidad = parseInt(cantidadInput.value, 10);

    let carrito = obtenerCarrito();
    if (carrito[id]) {
      carrito[id].cantidad += cantidad;
    } else {
      carrito[id] = { cantidad };
    }
    guardarCarrito(carrito);
    actualizarContador();
    // Mensaje de confirmación
    e.target.textContent = 'Agregado!';
    setTimeout(() => {
      e.target.textContent = 'Agregar al carrito';
    }, 1200);
  }
});
