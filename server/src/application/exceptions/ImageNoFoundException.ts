import { ApplicationException } from "../common/ApplicationException";

export class ImageNoFoundException extends ApplicationException {
  public constructor() {
    super("ImageNoFoundException", 400, "Image no found");
  }
}
