const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.post('/teams', async (req, res) => {
    try {
        const { name, players, size } = req.body;
        
        if (players.length !== size) {
            return res.status(400).send({ error: `El número de jugadores debe ser ${size}` });
        }
        const team = new Team({
            name,
            players,
            size
        });
        await team.save();
        res.status(201).send(team);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}
);

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).send(teams);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

router.get('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
);

module.exports = router;