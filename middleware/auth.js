const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_secreto_jwt'; // Cambia esto por una clave secreta más segura en producción, variable de entorno

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Acceso denegado. Token no proporcionado.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.playerId = decoded.playerId; // Almacena el ID del jugador en la solicitud para usarlo más tarde
        next();
    } catch (error) {
        res.status(401).send({ error: 'Token inválido.' });
    }
}
module.exports = authMiddleware;