const productos = [
  {
    id: 1,
    nombre: "Mesa Comedor Pampa",
    precio: 85000,
    descripcion: "Una mesa robusta de madera maciza, ideal para reuniones familiares.",
    imagen: "img/Mesa-Comedor-Pampa.png",
    categoria: "Mesas"
  },
  {
    id: 2,
    nombre: "Mesa de Centro Araucaria",
    precio: 42000,
    descripcion: "Elegante mesa de centro con diseño minimalista.",
    imagen: "img/Mesa-de-Centro-Araucaria.png",
    categoria: "Mesas"
  },
  {
    id: 3,
    nombre: "Sofá Patagonia",
    precio: 120000,
    descripcion: "Sofá amplio y cómodo, tapizado en tela de alta calidad.",
    imagen: "img/Sofá-Patagonia.png",
    categoria: "Sofás"
  },
  {
    id: 4,
    nombre: "Silla de Trabajo Belgrano",
    precio: 35000,
    descripcion: "Silla ergonómica para largas jornadas de trabajo.",
    imagen: "img/Silla-de-Trabajo-Belgrano.png",
    categoria: "Sillas"
  },
  {
    id: 5,
    nombre: "Aparador Uspallata",
    precio: 55000,
    descripcion: "Mueble con gran capacidad de guardado, estilo rústico-moderno.",
    imagen: "img/Aparador-Uspallata.png",
    categoria: "Almacenamiento"
  },
  {
    id: 6,
    nombre: "Biblioteca Recoleta",
    precio: 49000,
    descripcion: "Biblioteca clásica de madera clara, ideal para salas de lectura.",
    imagen: "img/Biblioteca-Recoleta.png",
    categoria: "Almacenamiento"
  },
  {
    id: 7,
    nombre: "Butaca Mendoza",
    precio: 65000,
    descripcion: "Butaca elegante con estilo minimalista, perfecta para salas de reuniones.",
    imagen: "img/Butaca-Mendoza.png",
    categoria: "Sillas"
  },
  {
    id: 8,
    nombre: "Escritorio Costa",
    precio: 78000,
    descripcion: "Escritorio moderno con diseño minimalista, perfecto para oficinas.",
    imagen: "img/Escritorio-Costa.png",
    categoria: "Escritorios"
  },
  {
    id: 9,
    nombre: "Mesa de Noche Aconcagua",
    precio: 100000,
    descripcion: "Mesa de noche elegante con diseño funcional, ideal para dormitorios.",
    imagen: "img/Mesa-de-Noche-Aconcagua.png",
    categoria: "Mesas"
  },
  {
    id: 10,
    nombre: "Sillas Córdoba",
    precio: 42000,
    descripcion: "Sillas de diseño clásico, perfectas para comedores familiares.",
    imagen: "img/Sillas-Córdoba.png",
    categoria: "Sillas"
  },
  {
    id: 11,
    nombre: "Sillón Copacabana",
    precio: 42000,
    descripcion: "Sillón de diseño contemporáneo con excelente comodidad.",
    imagen: "img/Sillón-Copacabana.png",
    categoria: "Sofás"
  }
];

// Funciones para el manejo del carrito
export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || {};
}

export function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function actualizarContador() {
  const carrito = obtenerCarrito();
  const total = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);
  const contador = document.getElementById('cart-count');
  if (contador) contador.textContent = total;
}

// Simular carga asíncrona de productos
export async function cargarProductos() {
  console.log('🔄 Iniciando carga de productos...');
  
  // Simular tiempo de carga de red (0.5 segundos)
  const tiempoEspera = 500; // 0.5 segundos fijo
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convertir el array en un objeto indexado por ID para fácil acceso
      const productosMap = {};
      productos.forEach(producto => {
        productosMap[producto.id] = producto;
      });
      
      console.log(`✅ Productos cargados exitosamente (${tiempoEspera}ms)`);
      resolve({
        lista: productos,
        porId: productosMap
      });
    }, tiempoEspera);
  });
}

// Simular carga asíncrona de un producto específico
export async function cargarProductoPorId(id) {
  console.log(`🔄 Cargando producto ${id}...`);
  
  // Simular tiempo de carga específico (0.5 segundos)
  const tiempoEspera = 500; // 0.5 segundos fijo
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find(p => p.id === parseInt(id, 10));
      if (producto) {
        console.log(`✅ Producto ${id} cargado exitosamente`);
        resolve(producto);
      } else {
        console.error(`❌ Producto ${id} no encontrado`);
        reject(new Error(`Producto ${id} no encontrado`));
      }
    }, tiempoEspera);
  });
}

// Función para mostrar estado de carga
export function mostrarCargando(contenedor, mensaje = 'Cargando productos...') {
  if (!contenedor) return;
  
  contenedor.innerHTML = `
    <div class="loading-container" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      min-height: 200px;
    ">
      <div class="spinner"></div>
      <p style="
        color: var(--burnt-sienna);
        font-size: 1.1rem;
        font-weight: 500;
      ">${mensaje}</p>
    </div>
  `;
}

  

// Función para mostrar error de carga
export function mostrarError(contenedor, mensaje = 'Error al cargar los productos') {
  if (!contenedor) return;
  
  contenedor.innerHTML = `
    <div class="error-container" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      min-height: 200px;
    ">
      <div style="
        font-size: 3rem;
        color: #C47A6D;
        margin-bottom: 1rem;
      ">⚠️</div>
      <p style="
        color: #C47A6D;
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1rem;
      ">${mensaje}</p>
      <button onclick="location.reload()" style="
        background-color: #A0522D;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
      ">Reintentar</button>
    </div>
  `;
}

// Funcionalidad de auto-hide header para mobile
export function inicializarAutoHideHeader() {
  let lastScroll = 0;
  let ticking = false;
  const header = document.querySelector('header');

  if (!header) return;

  // Agregar estilos CSS necesarios para la transición
  header.style.transition = 'transform 0.3s ease-in-out';
  header.style.willChange = 'transform';

  function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    // Solo aplicar auto-hide en dispositivos móviles (pantallas menores a 768px)
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      header.style.transform = 'translateY(0)';
      ticking = false;
      return;
    }

    // Evitar ocultar el header si estamos cerca del top
    if (currentScroll <= 10) {
      header.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      // Scroll hacia abajo, ocultar header (solo después de 100px)
      header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll) {
      // Scroll hacia arriba, mostrar header
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  // Event listener para scroll con mejor performance
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Event listener para resize para manejar cambios de orientación
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      header.style.transform = 'translateY(0)';
    }
  }, { passive: true });
}
