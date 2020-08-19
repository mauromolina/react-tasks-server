const express = require('express');
const { response } = require('express');
const connectDB = require('./config/db');

// crear servidor
const app = express();

// conectar db
connectDB();

app.use(express.json({ extended:true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

// definir la pag principal
app.get('/', (req, res) => {
    res.send('Hola')
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor funciona en el puerto ${PORT}`);
});