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

// Renderizar productos en el contenedor
function mostrarProductosDestacados() {
    const contenedor = document.getElementById("productos-container");
    // Solo ejecutar si el contenedor existe (página de inicio)
    if (contenedor) {
        // Limpiar el contenedor antes de renderizar
        contenedor.innerHTML = "";
        const idsAgregados = new Set();
        productosDestacados.forEach(prod => {
            if (!idsAgregados.has(prod.id)) {
                idsAgregados.add(prod.id);
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
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", mostrarProductosDestacados);

// Funcionalidad para el formulario de contacto
function manejarFormularioContacto() {
    const formulario = document.querySelector('.form-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío real del formulario
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
            
            // Limpiar el formulario
            formulario.reset();
        });
    }
}

function mostrarMensajeExito() {
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
document.addEventListener('click', function(e) {
  if (e.target.matches('button[data-add-cart]')) {
    const id = e.target.getAttribute('data-add-cart');
    let carrito = obtenerCarrito();
    if (carrito[id]) {
      carrito[id].cantidad += 1;
    } else {
      carrito[id] = { cantidad: 1 };
    }
    guardarCarrito(carrito);
    actualizarContador();
  }
});
document.addEventListener('DOMContentLoaded', actualizarContador);
// --- Fin carrito funcional ---

// Inicializar la funcionalidad del formulario cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarProductosDestacados();
    manejarFormularioContacto();
});
