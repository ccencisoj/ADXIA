import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction } from 'express';
import { HttpReponse } from '../http/HttpResponse';
import { HttpRequest } from '../http/HttpRequest';
import { MiddlewareErrorHandler } from '../errorHandlers/MiddlewareErrorHandler';
import { ExtensionNoValidException } from '../exceptions/ExtensionNoValidException';
import { UploadFileNoValidException } from '../exceptions/UploadFileNoValidException';

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    const directory = path.resolve("./uploads");
    cb(null, directory);
  },
  filename: (req, file, cb)=> {
    const originalname = file.originalname;
    const extensionName = String(originalname.split(".").pop()).toLowerCase();

    if(!(extensionName === "png" ||
      extensionName === "jpeg" ||
      extensionName === "jpg" ||
      extensionName === "svg")) {
      return cb(new ExtensionNoValidException(extensionName), "");
    }

    const filename = `${uuidv4()}.${extensionName}`;

    return cb(null, filename);
  }
})


const uploadMiddleware = multer({storage}).single("image");

interface UploadImageMiddlewareDeps {
  middlewareErrorHandler: MiddlewareErrorHandler;
}

export class UploadImageMiddleware {
  public middlewareErrorHandler: MiddlewareErrorHandler;

  public constructor({middlewareErrorHandler}: UploadImageMiddlewareDeps) {
    this.middlewareErrorHandler = middlewareErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse, next: NextFunction)=> {
    try {
      await new Promise((resolve, reject)=> {
        // @ts-ignore-next-line
        uploadMiddleware(req, res, (error)=> {
          error ? reject(error) : resolve(null);
        });
      });

      if(!(req.file)) {
        throw new UploadFileNoValidException();
      }

      next();

    }catch(error) {
      this.middlewareErrorHandler.execute(req, res, error);
    }
  }
}
