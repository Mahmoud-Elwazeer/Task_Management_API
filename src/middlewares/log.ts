import { Request, Response, NextFunction} from 'express'

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
};

export default logMiddleware
