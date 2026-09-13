import {Request, Response, RequestHandler, NextFunction} from 'express';

const TryCatch = (handler: RequestHandler): RequestHandler =>{
    return async(req: Request, res: Response, next: NextFunction) =>{
        try {
            await handler(req, res, next);
        } catch (err:any) {
            res.status(500).json({
                message: err.message,
            });
        }
    };
};

export default TryCatch;

//login → TryCatch(login) → handler = login → handler(req,res,next) → login execute
//first function = function lene ke liye, second function = Express request aane par us function ko execute karne ke liye.