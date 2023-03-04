import { ApplicationException } from "../common/ApplicationException";

export class ImageException extends ApplicationException {
  public constructor(message: string) {
    super("ImageException", 400, message);
  }
}
