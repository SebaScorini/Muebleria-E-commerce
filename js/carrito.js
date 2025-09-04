// carrito.js
// Muestra el contenido del carrito y permite eliminar productos

// Importa los productos
// Si usas módulos, puedes importar. Si no, asume que el objeto productos está disponible globalmente.

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || {};
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el contador en el header
function actualizarContador() {
  const carrito = obtenerCarrito();
  const total = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);
  const contador = document.getElementById('cart-count');
  if (contador) contador.textContent = total;
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById('carrito-contenido');
  contenedor.innerHTML = '';

  if (Object.keys(carrito).length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  let total = 0;
  const tabla = document.createElement('table');
  tabla.innerHTML = `<tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th><th></th></tr>`;

  for (const id in carrito) {
    // Si tienes el objeto productos global, úsalo:
    const prod = window.productos ? window.productos[id] : null;
    if (!prod) continue;
    const cantidad = carrito[id].cantidad;
    const subtotal = prod.precio * cantidad;
    total += subtotal;
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td class="celda-producto-carrito">
        <img src="${prod.imagen}" alt="${prod.nombre}" class="img-producto-carrito"> <span>${prod.nombre}</span>
      </td>
      <td>${cantidad}</td>
      <td>$${prod.precio.toLocaleString('es-AR')}</td>
      <td>$${subtotal.toLocaleString('es-AR')}</td>
      <td><button class="eliminar" data-id="${id}">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  }
  contenedor.appendChild(tabla);
  const totalDiv = document.createElement('div');
  totalDiv.className = 'carrito-total';
  totalDiv.innerHTML = `<h3>Total: $${total.toLocaleString('es-AR')}</h3>`;
  contenedor.appendChild(totalDiv);
}

// Evento para eliminar productos
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('eliminar')) {
    const id = e.target.dataset.id;
    let carrito = obtenerCarrito();
    delete carrito[id];
    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContador();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  mostrarCarrito();
  actualizarContador();
});
