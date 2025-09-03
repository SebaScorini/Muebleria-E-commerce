function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  contenedor.innerHTML = ""; // limpio antes de renderizar

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let tabla = `
    <table class="tabla-carrito">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;

  carrito.forEach((item, index) => {
    // acá depende cómo guardaste los productos en el localStorage
    // supongo que cada "item" tiene: { nombre, cantidad, precio }
    let subtotal = item.precio * item.cantidad;
    total += subtotal;

    tabla += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td>$${subtotal.toLocaleString()}</td>
      
        <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
      </tr>
    `;
  });

  tabla += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align:right; font-weight:bold;">Total:</td>
          <td colspan="2" style="font-weight:bold;">$${total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  `;

  contenedor.innerHTML = tabla;

  // eventos de eliminar
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      renderizarCarrito();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  renderizarCarrito();
});
