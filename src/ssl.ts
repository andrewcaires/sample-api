import { existsSync, readFileSync } from "fs";

import { API_HTTP_CRT, API_HTTP_KEY, API_TOKEN_CRT, API_TOKEN_KEY } from "./config";

const getFile = (file: string): Buffer | undefined => {

  if (existsSync(file)) {

    return readFileSync(file);
  }
};

export const crt = {
  http: getFile(API_HTTP_CRT),
  token: getFile(API_TOKEN_CRT),
};

export const key = {
  http: getFile(API_HTTP_KEY),
  token: getFile(API_TOKEN_KEY),
};
