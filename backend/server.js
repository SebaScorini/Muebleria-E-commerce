//servidor básico con Express para la API de productos.
const express = require('express');
const cors = require('cors');
const productosRouter = require('./rutas/productos');
const logger = require('./middleware/logger');

const app = express();

app.use(cors());           // permitir peticiones desde el client (dev)
app.use(express.json());   // middleware para JSON
app.use(logger);           // nuestro logger sencillo

// rutas de productos
app.use('/api/productos', productosRouter);

// 404 para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'No encontrado' });
});

// manejador de errores simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
