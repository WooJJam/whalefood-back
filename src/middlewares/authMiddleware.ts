import { Request, Response, NextFunction, request } from 'express';
import { logger } from '../utils/Logger';

export const AuthMiddleware = async (
    req:Request,
    res:Response,
    next:NextFunction) => {
        try {
            if (req.session && req.session.user) {
                next();
            } else {
                return res.status(401).send({ status:false, message: "Not Login" });
            }
        }catch(error) {
            logger.error(error);
        }
    }
