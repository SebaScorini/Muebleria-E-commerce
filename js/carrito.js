import {
    cargarProductos,
    obtenerCarrito,
    guardarCarrito,
    actualizarContador,
    mostrarCargando,
    mostrarError
} from './data.js';


let productosMap = {};

// Función para mostrar el carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById('carrito-contenido');

    if (!contenedor) return; // Si no existe el contenedor, no hacer nada

    contenedor.innerHTML = ''; // Limpiar contenedor

    if (Object.keys(carrito).length === 0) {
        const p = document.createElement('p');
        p.textContent = 'El carrito está vacío.';
        contenedor.appendChild(p);
        return;
    }

    let total = 0;
    const tabla = document.createElement('table');
    tabla.className = 'tabla-carrito';
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th><th>Acciones</th></tr>`;
    const tbody = document.createElement('tbody');

    for (const id in carrito) {
        const prod = productosMap[id];
        if (!prod) continue;

        const cantidad = carrito[id].cantidad;
        const subtotal = prod.precio * cantidad;
        total += subtotal;

        const fila = document.createElement('tr');

        // Celda Producto
        const celdaProd = document.createElement('td');
        celdaProd.dataset.label = "Producto";
        celdaProd.innerHTML = `<img src="${prod.imagen}" alt="${prod.nombre}" style="width:80px;height:auto;vertical-align:middle;margin-right:12px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12);"> <span style="vertical-align:middle;">${prod.nombre}</span>`;

        // Celda Cantidad
        const celdaCant = document.createElement('td');
        celdaCant.dataset.label = "Cantidad";
        celdaCant.textContent = cantidad;

        // Celda Precio
        const celdaPrecio = document.createElement('td');
        celdaPrecio.dataset.label = "Precio";
        celdaPrecio.textContent = `$${prod.precio.toLocaleString('es-AR')}`;

        // Celda Subtotal
        const celdaSubtotal = document.createElement('td');
        celdaSubtotal.dataset.label = "Subtotal";
        celdaSubtotal.textContent = `$${subtotal.toLocaleString('es-AR')}`;

        // Celda Acciones
        const celdaAcciones = document.createElement('td');
        celdaAcciones.dataset.label = "Acciones";
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'eliminar btn-eliminar';
        btnEliminar.dataset.id = id;
        btnEliminar.textContent = 'Eliminar';
        celdaAcciones.appendChild(btnEliminar);

        fila.append(celdaProd, celdaCant, celdaPrecio, celdaSubtotal, celdaAcciones);
        tbody.appendChild(fila);
    }

    tabla.append(thead, tbody);
    contenedor.appendChild(tabla);

    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrito-total';
    const h3Total = document.createElement('h3');
    h3Total.textContent = `Total: $${total.toLocaleString('es-AR')}`;
    totalDiv.appendChild(h3Total);
    contenedor.appendChild(totalDiv);
}

// Función para inicializar el carrito
export async function inicializarCarrito() {
    const contenedor = document.getElementById('carrito-contenido');
    if (!contenedor) return;

  // Evento para eliminar productos (versión simple como el original)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminar')) {
        const id = e.target.dataset.id;
        let carrito = obtenerCarrito();
        delete carrito[id];
        guardarCarrito(carrito);
        mostrarCarrito(); // Re-renderizar el carrito
        actualizarContador();
    }
  });

    try {
        // Cargar productos de forma asíncrona
        if (contenedor) {
            mostrarCargando(contenedor, 'Cargando carrito...');
        }

        const {
            porId
        } = await cargarProductos();
        productosMap = porId;

        // Mostrar carrito una vez que los productos están cargados
        mostrarCarrito();

    } catch (error) {
        console.error('Error al cargar productos para el carrito:', error);
        if (contenedor) {
            mostrarError(contenedor, 'Error al cargar el carrito');
        }
    }
}
