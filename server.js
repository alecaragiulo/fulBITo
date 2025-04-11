const express = require('express');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());

app.use(express.json());

mongoose.mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Registrar rutas con prefijos específicos
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/auth', authRoutes); // Prefijo más específico para rutas de autenticación

app.get('/', (req, res) => {
    res.send('Bienvenido al back de la app fulBITo');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} );

