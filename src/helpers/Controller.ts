import { Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

export class Controller<T extends Model<T>> {

  private log: string;
  private model: ModelStatic<T>;

  constructor(log: string, model: ModelStatic<T>) {

    this.log = log;
    this.model = model;
  }

  public add() {

    return async (req: Request, res: Response) => {

      const record = await this.model.create(req.body).catch((error) => {

        Log.error(error.message, this.log + ".add");
      });

      if (record) {

        return Responses.data(res, { id: (record as any).id });
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public all(...args: Array<any>) {

    return async (req: Request, res: Response) => {

      const records = await this.model.findAll(...args).catch((error) => {

        Log.error(error.message, this.log + ".all");
      });

      const count = await this.model.count().catch((error) => {

        Log.error(error.message, this.log + ".all");
      });

      if (records) {

        return Responses.data(res, { list: records, count });
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public del() {

    return async (req: Request, res: Response) => {

      const { id } = req.params;

      const rows = await this.model.destroy({

        where: { id } as any,

      }).catch((error) => {

        Log.error(error.message, this.log + ".del");
      });

      if (rows) {

        return Responses.success(res, "OK");
      }

      return Responses.notfound(res, "Record not found");
    };
  }

  public get(...args: Array<any>) {

    return async (req: Request, res: Response) => {

      const { id } = req.params;

      const record = await this.model.findByPk(id, ...args).catch((error) => {

        Log.error(error.message, this.log + ".get");
      });

      if (record) {

        return Responses.data(res, record.toJSON());
      }

      if (record === null) {

        return Responses.notfound(res, "Record not found");
      }

      return Responses.error(res, "Internal Server Error");
    };
  }

  public set() {

    return async (req: Request, res: Response) => {

      const { id } = req.params;

      const update = await this.model.update(req.body, {

        where: { id } as any,

      }).catch((error) => {

        Log.error(error.message, this.log + ".set");
      });

      if (update) {

        const [count] = update;

        if (count) {

          return Responses.success(res, "OK");
        }
      }

      return Responses.success(res, "Record not changed");
    };
  }
}
