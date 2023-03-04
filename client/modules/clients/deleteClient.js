import { config } from "~/config";
import { http } from "~/packages/http";
import { Client } from "~/models/Client";

export const deleteClient = async ({
  name,
  surname,
  nroDocument,
  phone,
  address,
  imageURL,
  business
})=> {
  const response = await http.post(`${config.CLIENTS_SERVICE_URI}/client`, {
    name,
    surname,
    nroDocument,
    phone,
    address,
    imageURL,
    business
  });

  const data = response.data;

  const client = new Client(data.client);

  return client;
}
