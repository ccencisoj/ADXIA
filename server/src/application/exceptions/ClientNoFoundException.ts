import { ApplicationException } from "../common/ApplicationException";

export class ClientNoFoundException extends ApplicationException {
  public constructor() {
    super("ClientNoFoundException", 400, "Client no found");
  }
}
