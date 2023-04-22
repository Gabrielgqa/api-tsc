import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      isAdmin?: number;
    }

    interface RequestPersonalized extends Request {
      userId: number;
      isAdmin: number;
    }
  }
}

export { RequestPersonalized };
