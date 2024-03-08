import { ControllerBase } from "@andrewcaires/api";
import { Body, Controller, Delete, Extends, Get, Middleware, Params, Post, Put, Res, Responses } from "@andrewcaires/express";
import { Validation } from "@andrewcaires/utils.js";
import { Response } from "express";

import { Sample } from "../models/Sample";

@Controller("/sample")
@Extends(ControllerBase)
export class SampleController extends ControllerBase {

  public error(error: any) {

    console.log(error.message);
  }

  @Post()
  @Middleware("validation", {

    name: Validation.string().required(),

  })
  public async recordAdd(
    @Body() body: any,
    @Res() res: Response
  ) {

    const record = await Sample.create({

      ...body,

    }).catch(this.error);

    if (record) {

      Responses.data(res, { id: record.id });

      return;
    }

    Responses.error(res, "Internal Server Error");
  }

  @Get()
  public async recordAll(
    @Res() res: Response
  ) {

    const records = await Sample.findAll().catch(this.error);

    if (records) {

      Responses.list(res, records.map((record) => record.toJSON()));

      return;
    }

    Responses.error(res, "Internal Server Error");
  }

  @Delete("/:id")
  public async recordDel(
    @Params("id") id: string,
    @Res() res: Response
  ) {

    const rows = await Sample.destroy({

      where: { id },

    }).catch(this.error);

    if (rows) {

      Responses.success(res, "OK");

      return;
    }

    Responses.notfound(res, "Record not found");
  }

  @Get("/:id")
  public async recordGet(
    @Params("id") id: string,
    @Res() res: Response
  ) {

    const record = await Sample.findByPk(id).catch(this.error);

    if (record) {

      Responses.data(res, record.toJSON());

      return;
    }

    if (record === null) {

      Responses.notfound(res, "Record not found");

      return;
    }

    Responses.error(res, "Internal Server Error");
  }

  @Put("/:id")
  @Middleware("validation", {

    name: Validation.string().required(),

  })
  protected async recordSet(
    @Params("id") id: string,
    @Body() body: any,
    @Res() res: Response
  ) {

    const [count] = await Sample.update({

      ...body,

    }, {

      where: { id },

    }).catch(this.error) || [];

    if (count) {

      Responses.success(res, "OK");

      return;
    }

    Responses.success(res, "Record not changed");
  }
}
