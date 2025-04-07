const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Match = require('../models/match');

//partido entre equipos
router.post('/matches',async (req, res) => {
    try {
        const { team1Id, team2Id, date, location } = req.body;
        const team1 = await Team.findById(team1Id);
        const team2 = await Team.findById(team2Id);
        if (!team1 || !team2) {
            return res.status(404).send({ error: 'Uno o ambos equipos no existen' });
        }
        if (team1Id.size !== team2Id.size) {
            return res.status(400).send({ error: 'Los equipos deben tener el mismo tamaño' });
        }
        const match = new Match({
            team1: team1Id,
            team2: team2Id,
            date,
            location,
        });
        await match.save();
        res.status(201).send(match);
    } 
    catch (error) {
        res.status(400).send({ error: error.message });
    }

}
);

// Obtener todos los partidos
router.get('/matches', async (req, res) => {
    try {
        const matches = await Match.find().populate('team1 team2');
        res.status(200).send(matches);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

//actualizar el resultado de un partido
router.put('/matches/:id', async (req, res) => {
    try {
        const { team1Goals, team2Goals } = req.body;
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).send({ error: 'Partido no encontrado' });
        }
        match.result.team1Goals = team1Goals;
        match.result.team2Goals = team2Goals;
        match.status = 'completado';
        await match.save();
        res.status(200).send(match);
    
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
);

// Obtener un partido por ID
router.get('/matches/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id).populate('team1 team2');
        if (!match) {
            return res.status(404).send({ error: 'Partido no encontrado' });
        }
        res.status(200).send(match);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

module.exports = router;