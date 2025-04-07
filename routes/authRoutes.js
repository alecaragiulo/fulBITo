const express = require('express');
const router = express.Router();
const Player = require('../models/player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_secreto_jwt'; // Cambia esto por una clave secreta más segura en producción, variable de entorno

// Registro de jugador
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const player = new Player({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await player.save();
        res.status(201).send({ message: 'Jugador registrado exitosamente', playerId: player._id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
);

//login de jugador
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const player = await Player.findOne({ email });
        if (!player || !await bcrypt.compare(password, player.password)) {
            return res.status(401).send({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ playerId: player._id }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token,player});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

module.exports = router;