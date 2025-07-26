"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, res, next) => {
    // TODO: Echte JWT-Authentifizierung implementieren
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Kein Authorization Header gefunden' });
    }
    try {
        // Placeholder - hier würdest du den JWT Token validieren
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Kein Token gefunden' });
        }
        // Mock user für Development
        req.user = {
            id: '1',
            email: 'dev@freieforschung.at',
            role: 'researcher'
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Ungültiger Token' });
    }
};
exports.authenticate = authenticate;
