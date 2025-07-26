import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
  } catch (error) {
    return res.status(401).json({ error: 'Ungültiger Token' });
  }
};
