import { NextFunction, Response } from 'express';
import { RequestPersonalized } from '../../types/custom';

export async function isAdmin(request: RequestPersonalized, response: Response, next: NextFunction) {
    const isAdmin = request.session.isAdmin;

    if(!isAdmin) {
        return response.status(403).json({
            message: "You don't have permission for this"
        });
    }

    return next();
}