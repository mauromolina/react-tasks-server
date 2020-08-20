const express = require('express');
const { response } = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// crear servidor
const app = express();

// conectar db
connectDB();

app.use(express.json({ extended:true }));
app.use(cors());

// puerto de la app
const port = process.env.port || 4000;

// importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// definir la pag principal
app.get('/', (req, res) => {
    res.send('Hola')
});

// iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor funciona en el puerto ${port}`);
});