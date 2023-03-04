import {
  Client, 
  PersonName, 
  PersonSurname, 
  PersonDocument, 
  PersonPhoneNumber 
} from "../../domain";

type ClientRaw = {
  id: string;
  name: string;
  surname: string;
  nroDocument: string;
  phoneNumber: string;
  address: string;
  imageURL: string;
  business: string;
};

export class ClientMapper {
  public static toJSON = (client: Client): any => {
    return {
      id: client.id,
      name: client.name,
      surname: client.surname,
      nroDocument: client.nroDocument,
      phoneNumber: client.phoneNumber,
      address: client.address,
      imageURL: client.imageURL,
      business: client.business
    }
  }

  public static toPersistence = (client: Client): any => {
    return {
      id: client.id,
      name: client.name,
      surname: client.surname,
      nroDocument: client.nroDocument,
      phoneNumber: client.phoneNumber,
      address: client.address,
      imageURL: client.imageURL,
      business: client.business
    }
  }

  public static toDomain = (raw: ClientRaw): Client => {
    const nameOrError = PersonName.create(raw.name);
    const surnameOrError = PersonSurname.create(raw.surname);
    const nroDocumentOrError = PersonDocument.create(raw.nroDocument);
    const phoneNumberOrError = PersonPhoneNumber.create(raw.phoneNumber);
    const clientOrError = Client.create({
      name: nameOrError.getValue(),
      surname: surnameOrError.getValue(),
      nroDocument: nroDocumentOrError.getValue(),
      phoneNumber: phoneNumberOrError.getValue(),
      address: raw.address,
      imageURL: raw.imageURL,
      business: raw.business
    }, raw.id);
    const client = clientOrError.getValue();
    return client;
  }
}
