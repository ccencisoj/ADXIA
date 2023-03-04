import { Schema, model } from 'mongoose';

const ClientSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  nroDocument: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  address: {type: String, required: true},
  imageURL: {type: String, required: true},
  business: {type: String, required: true},
  deleted: {type: Boolean, required: true}
});

const ClientModel = model("Client", ClientSchema);

export { ClientModel };
