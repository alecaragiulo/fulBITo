const express = require('express');
const router = express.Router();
const Player = require('../models/player');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
  try {
    const player = await Player.findById(req.user);
    if (!player) return res.status(404).json({ msg: 'Jugador no encontrado' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const players = await Player.find({}, 'name email');
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;