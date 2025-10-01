// routes/productos.js
const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

// GET /api/productos → lista completa
router.get('/', (req, res) => {
  res.json(productos);
});

// GET /api/productos/:id → buscar por id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(producto);
});

module.exports = router;
