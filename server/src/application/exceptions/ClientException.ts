import { ApplicationException } from "../common/ApplicationException";

export class ClientException extends ApplicationException {
  public constructor(message: string) {
    super("ClientException", 400, message);
  }
}
