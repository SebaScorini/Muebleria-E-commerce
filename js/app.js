// app.js - Lógica para las páginas de inicio, catálogo, detalle y contacto.

import {
    cargarProductos,
    cargarProductoPorId,
    obtenerCarrito,
    guardarCarrito,
    actualizarContador,
    mostrarCargando,
    mostrarError
} from './data.js';

// Función para mostrar productos destacados (página de inicio)
export async function mostrarProductosDestacados() {
    const contenedor = document.getElementById("productos-container");
    if (!contenedor) return; // Solo ejecutar si el contenedor existe

    try {
        // Mostrar estado de carga
        mostrarCargando(contenedor, 'Cargando productos destacados...');

        // Cargar productos de forma asíncrona
        const {
            lista: productosCompletos
        } = await cargarProductos();

        // Array de productos destacados (seleccionamos 6 productos)
        const productosDestacados = productosCompletos.slice(0, 6);

        // Limpiar contenedor y renderizar productos
        contenedor.innerHTML = "";

        productosDestacados.forEach(prod => {
            const article = document.createElement("article");
            article.className = "producto";
            article.dataset.id = prod.id;

            const link = document.createElement('a');
            link.href = `producto.html?id=${prod.id}`;

            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;

            const h3 = document.createElement('h3');
            h3.textContent = prod.nombre;

            const p = document.createElement('p');
            p.className = 'precio';
            p.textContent = `$${prod.precio.toLocaleString("es-AR")}`;

            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.addCart = prod.id;
            button.textContent = 'Añadir al Carrito';

            link.append(img, h3, p);
            article.append(link, button);
            contenedor.appendChild(article);
        });

        console.log('✅ Productos destacados renderizados exitosamente');

    } catch (error) {
        console.error('❌ Error al cargar productos destacados:', error);
        mostrarError(contenedor, 'Error al cargar productos destacados');
    }
}

// Función para inicializar la página de productos (catálogo)
export async function inicializarProductos() {
    const contenedor = document.querySelector(".catalogo-grid");
    if (!contenedor) return; // Si no existe el contenedor, salir

    try {
        // Mostrar estado de carga
        mostrarCargando(contenedor, 'Cargando catálogo de productos...');

        // Cargar productos de forma asíncrona
        const {
            lista: productosLista
        } = await cargarProductos();

        // Limpiar contenedor
        contenedor.innerHTML = "";

        // Generar el HTML para cada producto
        productosLista.forEach(prod => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto";

            const link = document.createElement('a');
            link.href = `producto.html?id=${prod.id}`;
            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;
            const h3 = document.createElement('h3');
            h3.textContent = prod.nombre;
            link.append(img, h3);

            const precio = document.createElement('p');
            precio.className = 'precio';
            precio.textContent = `$${prod.precio.toLocaleString("es-AR")}`;

            const label = document.createElement('label');
            label.textContent = 'Cantidad: ';
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '10';
            input.value = '1';
            label.appendChild(input);

            const button = document.createElement('button');
            button.className = 'agregar-carrito';
            button.dataset.id = prod.id;
            button.textContent = 'Agregar al carrito';

            productoDiv.append(link, precio, label, button);
            contenedor.appendChild(productoDiv);
        });

        // Evento para agregar al carrito
        contenedor.addEventListener('click', function(e) {
            if (e.target.classList.contains('agregar-carrito')) {
                const id = parseInt(e.target.dataset.id, 10);
                const cantidadInput = e.target.parentElement.querySelector('input[type="number"]');
                const cantidad = parseInt(cantidadInput.value, 10);

                let carrito = obtenerCarrito();
                if (carrito[id]) {
                    carrito[id].cantidad += cantidad;
                } else {
                    carrito[id] = {
                        cantidad
                    };
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

        console.log('✅ Catálogo de productos renderizado exitosamente');

    } catch (error) {
        console.error('❌ Error al cargar catálogo:', error);
        mostrarError(contenedor, 'Error al cargar el catálogo de productos');
    }
}

// Función para inicializar la página de producto individual
export async function inicializarProducto() {
    const contenedor = document.getElementById("detalle-container");
    if (!contenedor) return; // Si no existe el contenedor, salir

  // 1. Obtener el ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10); // Convertir el ID de la URL a número

  if (!id) {
    console.error('ID del producto no encontrado en la URL');
    mostrarError(contenedor, 'ID del producto no encontrado');
    return;
  }

  try {
    // Mostrar estado de carga
    mostrarCargando(contenedor, 'Cargando detalle del producto...');

    // 2. Cargar producto de forma asíncrona
    const producto = await cargarProductoPorId(id);

    if (!producto) {
      console.error('Producto no encontrado');
      mostrarError(contenedor, 'Producto no encontrado');
      return;
    }

        // 3. Generar el HTML de forma segura
        contenedor.innerHTML = ''; // Limpiar

        const detalleDiv = document.createElement('div');
        detalleDiv.className = 'producto-detalle';

        const imagenDiv = document.createElement('div');
        imagenDiv.className = 'detalle-imagen';
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        imagenDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'detalle-info';
        const h1 = document.createElement('h1');
        h1.textContent = producto.nombre;
        const pDesc = document.createElement('p');
        pDesc.textContent = producto.descripcion;
        const pPrecio = document.createElement('p');
        pPrecio.className = 'precio';
        pPrecio.textContent = `$${producto.precio.toLocaleString("es-AR")}`;
        const label = document.createElement('label');
        label.textContent = 'Cantidad: ';
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '10';
        input.value = '1';
        input.id = 'cantidad-producto';
        label.appendChild(input);
        const button = document.createElement('button');
        button.id = 'agregar-carrito-detalle';
        button.textContent = 'Añadir al Carrito';

        infoDiv.append(h1, pDesc, pPrecio, label, button);
        detalleDiv.append(imagenDiv, infoDiv);
        contenedor.appendChild(detalleDiv);

    // Lógica para agregar al carrito desde la página de detalle
    const btn = document.getElementById('agregar-carrito-detalle');
    if (btn) {
      btn.addEventListener('click', function() {
        const cantidad = parseInt(document.getElementById('cantidad-producto').value, 10) || 1;
        let carrito = obtenerCarrito();
        if (carrito[id]) {
          carrito[id].cantidad += cantidad;
        } else {
          carrito[id] = {
                        cantidad
                    };
        }
        guardarCarrito(carrito);
        actualizarContador();
        
        // Mensaje de confirmación
        btn.textContent = 'Producto añadido!';
        setTimeout(() => {
          btn.textContent = 'Añadir al Carrito';
        }, 1200);
      });
    }

    console.log('✅ Producto detalle renderizado exitosamente');

  } catch (error) {
    console.error('❌ Error al cargar producto detalle:', error);
    mostrarError(contenedor, 'Error al cargar el detalle del producto');
  }
}

// Funcionalidad para el formulario de contacto
export function manejarFormularioContacto() {
    const formulario = document.querySelector('.form-contacto');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío real del formulario

            // Validación simple
            const nombre = formulario.querySelector('#nombre').value.trim();
            const email = formulario.querySelector('#email').value.trim();
            const mensaje = formulario.querySelector('#mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos del formulario.');
                return; // Detiene la ejecución si la validación falla
            }

            // Mostrar mensaje de éxito
            mostrarMensajeExito();

            // Limpiar el formulario
            formulario.reset();
        });
    }
}

/**
 * Muestra una ventana modal de éxito.
 */
export function mostrarMensajeExito() {
    // Crear el elemento del mensaje
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.innerHTML = `
        <div class="mensaje-contenido">
            <span class="icono-exito">✓</span>
            <p>¡Mensaje enviado con éxito!</p>
            <p>Nos pondremos en contacto contigo a la brevedad.</p>
        </div>
    `;

    // Agregar el mensaje al body
    document.body.appendChild(mensaje);

    // Mostrar el mensaje con animación
    setTimeout(() => {
        mensaje.classList.add('mostrar');
    }, 100);

    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
        mensaje.classList.remove('mostrar');
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.parentNode.removeChild(mensaje);
            }
        }, 300);
    }, 4000);
}

// --- Carrito funcional para productos destacados ---
export function configurarCarritoDestacados() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('button[data-add-cart]')) {
            const id = parseInt(e.target.getAttribute('data-add-cart'), 10);
            let carrito = obtenerCarrito();
            if (carrito[id]) {
                carrito[id].cantidad += 1;
            } else {
                carrito[id] = {
                    cantidad: 1
                };
            }
            guardarCarrito(carrito);
            actualizarContador();

            // Mostrar mensaje de confirmación
            e.target.textContent = '¡Agregado!';
            setTimeout(() => {
                e.target.textContent = 'Añadir al Carrito';
            }, 1200);
        }
    });
}
