const express = require('express');
const router = express.Router();
const Player = require('../models/player');
const authMiddleware = require('../middleware/auth');

//ver mi perfil
router.get('/me',authMiddleware, async (req, res) => {
    try {
        const player = await player.findById(req.playerId);
        if (!player)
            return res.status(404).send({ error: 'Jugador no encontrado' });
        res.send(player);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);
module.exports = router;
