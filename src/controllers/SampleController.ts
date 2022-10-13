import { ModelController } from "@andrewcaires/api";
import { TypeObject, Validation, ValidationBase } from "@andrewcaires/utils.js";

import { Sample } from "../models/Sample";

export class SampleController extends ModelController<Sample> {

  protected create: TypeObject<ValidationBase> = {

    name: Validation.string().required(),

  };

  protected update: TypeObject<ValidationBase> = {

    name: Validation.string().required(),

  };

  public intialize() {

    this.setModel(Sample);
    this.router.use(this.auth);

    this.router.get("/", this.read(), this.all().bind(this));

    this.router.post("/", this.write(), this.validation(this.create), this.add().bind(this));

    this.router.route("/:id")

      .get(this.read(), this.get().bind(this))

      .put(this.write(), this.validation(this.update), this.set().bind(this))

      .delete(this.write(), this.del().bind(this));
  }
}
