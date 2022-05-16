import { uuidv4 } from "@andrewcaires/utils.js";
import { Response, Request, NextFunction } from "express";
import { existsSync } from "fs";
import mime from "mime-types";
import multer from "multer";
import { join } from "path";

import { Responses } from "../helpers/Responses";

import { API_UPLOAD_COUNT, API_UPLOAD_FIELD, API_UPLOAD_SIZE, API_UPLOAD_TEMP } from "../config";

interface UploadOptions {
  count?: number;
  field?: string;
  path?: string;
  size?: number;
  types?: string[];
}

const getFileName = (path: string, ext: string): string => {

  const name = uuidv4() + "." + ext;

  if (existsSync(join(path, name))) {

    return getFileName(path, ext);
  }

  return name;
};

export const upload = (options?: UploadOptions) => {

  const path = options?.path || API_UPLOAD_TEMP;

  const storage = multer.diskStorage({

    destination: (req, file, cb) => cb(null, path),

    filename: async (req, file, cb) => cb(null, getFileName(path, mime.extension(file.mimetype) || "bin")),

  });

  const fileSize = (options?.size || API_UPLOAD_SIZE) * 1000000;

  const upload = multer({

    storage: storage,

    async fileFilter(req, file, cb) {

      const index = options?.types?.indexOf(file.mimetype);

      if (index !== undefined && index < 0) {

        return cb(new Error("File type not allowed"));
      }

      return cb(null, true);
    },

    limits: { fileSize },

  });

  const count = options?.count || API_UPLOAD_COUNT;
  const field = options?.field || API_UPLOAD_FIELD;

  const middleware = upload.array(field, count);

  return (req: Request, res: Response, next: NextFunction) => {

    middleware(req, res, function (error) {

      if (error) {

        return Responses.error(res, error.message);
      }

      return next();
    });
  };
};
