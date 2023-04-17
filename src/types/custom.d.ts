import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }

    interface RequestWithUserId extends Request {
      userId: string;
    }
  }
}

export { RequestWithUserId };
