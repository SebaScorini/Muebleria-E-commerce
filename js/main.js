// main.js - Punto de entrada principal para todo el JavaScript del sitio.

import { actualizarContador, inicializarAutoHideHeader } from './data.js';
import {
    mostrarProductosDestacados,
    inicializarProductos,
    inicializarProducto,
    manejarFormularioContacto,
    configurarCarritoDestacados
} from './app.js';
import { inicializarCarrito } from './carrito.js';

// Se ejecuta cuando el DOM está completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // --- Funciones globales que se ejecutan en TODAS las páginas ---
    actualizarContador();
    inicializarAutoHideHeader();
    configurarCarritoDestacados(); // Para los botones "Añadir al carrito" en productos destacados

    // --- Funciones específicas de cada página ---
    // Se comprueba la existencia de un elemento único en cada página
    // para decidir qué script ejecutar.

    // Página de Inicio (index.html)
    if (document.getElementById('productos-container')) {
        mostrarProductosDestacados();
    }

    // Página de Catálogo (productos.html)
    if (document.querySelector('.catalogo-grid')) {
        inicializarProductos();
    }

    // Página de Detalle de Producto (producto.html)
    if (document.getElementById('detalle-container')) {
        inicializarProducto();
    }

    // Página de Carrito (carrito.html)
    if (document.getElementById('carrito-contenido')) {
        inicializarCarrito();
    }

    // Página de Contacto (contacto.html)
    if (document.querySelector('.form-contacto')) {
        manejarFormularioContacto();
    }
});