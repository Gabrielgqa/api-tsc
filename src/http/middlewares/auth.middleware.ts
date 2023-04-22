import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestPersonalized } from '../../types/custom';

export const verifyToken = (req: RequestPersonalized, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    next();
  });
}
