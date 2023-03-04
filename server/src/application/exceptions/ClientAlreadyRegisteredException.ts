import { Client } from "../../domain";
import { ApplicationException } from "../common/ApplicationException";

export class ClientAlreadyRegisteredException extends ApplicationException {
  public constructor(client: Client) {
    super(
      "ClientAlreadyRegisteredException", 400, 
      `The client with the document number ${client.nroDocument} already registered`
    );
  }
}
