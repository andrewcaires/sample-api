import { Response } from 'express';

export class Responses {

    static success(res: Response, message: string) {

        return res.status(200).json({status: 1, message});
    }

    static data(res: Response, message: string, data: any) {

        return res.status(200).json({status: 2, message, data});
    }

    static error(res: Response, message: string) {

        return res.status(500).json({status: 0, message});
    }

    static notfound(res: Response, message: string) {

        return res.status(404).json({status: 0, message});
    }

    static validation(res: Response, message: string, data: any) {

        return res.status(400).json({status: 2, message, data});
    }

    static unauthorized(res: Response, message: string) {

        return res.status(401).json({status: 0, message});
    }
}
