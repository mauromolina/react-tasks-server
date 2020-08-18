const express = require('express');
const { response } = require('express');
const connectDB = require('./config/db');

// crear servidor
const app = express();

// conectar db
connectDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

// definir la pag principal
app.get('/', (req, res) => {
    res.send('Hola')
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor funciona en el puerto ${PORT}`);
});