const express = require('express');
const router = express.Router();

// Lista de productos de ejemplo
const productos = [
  { id: 1, nombre: "Mesa Comedor Pampa", precio: 85000 },
  { id: 2, nombre: "Silla de Trabajo Belgrano", precio: 35000 },
  { id: 3, nombre: "Sofá Patagonia", precio: 120000 }
];

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(productos);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(producto);
});

module.exports = router;
// rutas de productos para la API RESTful.