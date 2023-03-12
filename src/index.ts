import { Application } from "@andrewcaires/api";

import { SampleController } from "./controllers";

const main = async () => {

  const app = new Application([

    new SampleController,

  ]);

  await app.listen();
};

main().catch(console.log);
