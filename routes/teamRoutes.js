const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const auth = require('../middleware/auth');

// Listar todos los equipos
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find().populate('players', 'name email'); // Popula los jugadores
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo equipo
router.post('/', auth, async (req, res) => {
  try {
    const { name, size, players } = req.body;
    if (players.length !== size) {
      return res.status(400).json({ error: `El número de jugadores debe ser ${size}` });
    }
    const team = new Team({ name, size, players });
    await team.save();
    const populatedTeam = await Team.findById(team._id).populate('players', 'name email');
    res.status(201).json(populatedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un equipo por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players', 'name email');
    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;