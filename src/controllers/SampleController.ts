import { ControllerBase } from "@andrewcaires/api";
import { Body, Context, Controller, Ctx, Delete, Extends, Get, Middleware, Params, Post, Put } from "@andrewcaires/express";
import { Validation } from "@andrewcaires/utils.js";

import { Sample } from "../models";

@Controller("/sample")
@Extends(ControllerBase)
export class SampleController extends ControllerBase {

  @Post()
  @Middleware("validation", {

    name: Validation.string().required(),

  })
  public async recordAdd(
    @Ctx() ctx: Context,
    @Body() body: any
  ) {

    const record = await Sample.create({

      ...body,

    }).catch(this.error);

    if (record) {

      return ctx.json({ id: record.id });
    }

    ctx.error("Internal Server Error");
  }

  @Get()
  public async recordAll(
    @Ctx() ctx: Context,
  ) {

    const records = await Sample.findAll().catch(this.error);

    if (records) {

      return ctx.json(records.map((record) => record.toJSON()));
    }

    ctx.error("Internal Server Error");
  }

  @Delete("/:id")
  public async recordDel(
    @Ctx() ctx: Context,
    @Params("id") id: string
  ) {

    const rows = await Sample.destroy({

      where: { id },

    }).catch(this.error);

    if (rows) {

      return ctx.success("OK");
    }

    ctx.notFound("Record not found");
  }

  @Get("/:id")
  public async recordGet(
    @Ctx() ctx: Context,
    @Params("id") id: string
  ) {

    const record = await Sample.findByPk(id).catch(this.error);

    if (record) {

      return ctx.json(record.toJSON());
    }

    if (record === null) {

      return ctx.notFound("Record not found");
    }

    ctx.error("Internal Server Error");
  }

  @Put("/:id")
  @Middleware("validation", {

    name: Validation.string().required(),

  })
  protected async recordSet(
    @Ctx() ctx: Context,
    @Params("id") id: string,
    @Body() body: any
  ) {

    const [count] = await Sample.update({

      ...body,

    }, {

      where: { id },

    }).catch(this.error) || [];

    if (count) {

      return ctx.success("OK");
    }

    ctx.success("Record not changed");
  }
}
