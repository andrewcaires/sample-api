import { Response } from "express";

export class Responses {

  static success(res: Response, message: string) {

    return res.status(200).json({ message });
  }

  static data(res: Response, obj: object) {

    return res.status(200).json({ ...obj });
  }

  static error(res: Response, message: string) {

    return res.status(500).json({ message });
  }

  static list(res: Response, arr: Array<any>) {

    return res.status(200).json([...arr]);
  }

  static notfound(res: Response, message: string) {

    return res.status(404).json({ message });
  }

  static validation(res: Response, message: string, details: any) {

    return res.status(400).json({ message, details });
  }

  static unauthorized(res: Response, message: string) {

    return res.status(401).json({ message });
  }
}
